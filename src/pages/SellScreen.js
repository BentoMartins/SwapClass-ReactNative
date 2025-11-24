import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Animated,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// Componentes Genéricos
import FormHeader from "../components/FormHeader";
import ImageUploadPlaceholder from "../components/ImageUploadPlaceholder";
import LabelledTextInput from "../components/LabelledTextInput";
import LabelledDropdown from "../components/LabelledDropdown";
import ActionSheetModal from "../components/ActionSheetModal";

// Services e Contexts
import productService from "../services/product";
import { uploadImage } from "../services/cloudinary";
import { useCurrency } from "../contexts/CurrencyContext";

// Constantes
import { CATEGORIES, CONDITIONS, getCategoryName, getConditionName } from "../utils/constants";

// Moedas disponíveis
const currencies = ["BRL", "USD", "EUR"];

// Estilos específicos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  scrollContainer: {
    paddingTop: 35,
    flex: 1,
    paddingBottom: 50,
  },
  contentContainer: {
    paddingHorizontal: 35,
    paddingVertical: 40,
    paddingBottom: 100,
  },
  formSection: {
    marginBottom: 30,
  },
  optionalLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  removeImageIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
});

export default function SellScreen({ navigation }) {
  const { currency } = useCurrency();
  
  const [formData, setFormData] = useState({
    title: "", // Será enviado como brand
    model: "",
    price: "",
    description: "",
    currency: currency, // Inicializa com a moeda do contexto
    category: "", // Nova: categoria do produto
    condition: "", // Nova: condição do produto
  });
  
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  
  // Animações para os modais
  const currencySlideAnim = useRef(new Animated.Value(300)).current;
  const categorySlideAnim = useRef(new Animated.Value(300)).current;
  const conditionSlideAnim = useRef(new Animated.Value(300)).current;

  // Sincroniza a moeda do formulário com a moeda do contexto
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency: currency,
    }));
  }, [currency]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCurrencySelect = (selectedCurrency) => {
    setFormData((prev) => ({ ...prev, currency: selectedCurrency }));
    setShowCurrencyModal(false);
  };

  // Nova: Handler para seleção de categoria
  const handleCategorySelect = (categoryName) => {
    const selectedCategory = CATEGORIES.find((cat) => cat.name === categoryName);
    if (selectedCategory) {
      setFormData((prev) => ({ ...prev, category: selectedCategory.value }));
    }
    setShowCategoryModal(false);
  };

  // Nova: Handler para seleção de condição
  const handleConditionSelect = (conditionName) => {
    const selectedCondition = CONDITIONS.find((cond) => cond.name === conditionName);
    if (selectedCondition) {
      setFormData((prev) => ({ ...prev, condition: selectedCondition.value }));
    }
    setShowConditionModal(false);
  };

  // Solicita permissão para acessar a câmera
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada!",
        "Você precisa permitir acesso à câmera."
      );
      return false;
    }
    return true;
  };

  // Seleciona imagem da galeria
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // Proporção 4:3 para melhor ajuste
      quality: 0.7, // Qualidade reduzida para menor tamanho
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Tira foto com a câmera
  const takePhotoWithCamera = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3], // Proporção 4:3 para melhor ajuste
      quality: 0.7, // Qualidade reduzida para menor tamanho
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Handler para o placeholder de upload de imagem
  const handleImageUploadPress = () => {
    Alert.alert(
      "Adicionar foto",
      "Escolha uma opção",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Câmera", onPress: takePhotoWithCamera },
        { text: "Galeria", onPress: pickImageFromGallery },
      ],
      { cancelable: true }
    );
  };

  const handlePublish = async () => {
    // Validação dos campos obrigatórios
    if (!formData.title.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o título do item.");
      return;
    }

    if (!formData.model.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o modelo do item.");
      return;
    }

    if (!formData.price.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o preço do item.");
      return;
    }

    // Validar se o preço é um número válido
    const priceValue = formData.price.replace(/[^\d,.-]/g, "").replace(",", ".");
    const numericPrice = parseFloat(priceValue);
    
    if (isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert("Preço inválido", "Por favor, insira um preço válido.");
      return;
    }

    if (!formData.currency) {
      Alert.alert("Campo obrigatório", "Por favor, selecione uma moeda.");
      return;
    }

    // Nova: Validação de categoria
    if (!formData.category) {
      Alert.alert("Campo obrigatório", "Por favor, selecione uma categoria.");
      return;
    }

    // Nova: Validação de condição
    if (!formData.condition) {
      Alert.alert("Campo obrigatório", "Por favor, selecione a condição do produto.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload da imagem para Cloudinary (se houver)
      let imageUrl = null;

      if (image) {
        if (!image.base64) {
          // Se a imagem já é uma URL (não tem base64), usa diretamente
          imageUrl = image.uri;
        } else {
          // Faz upload da imagem para Cloudinary
          const uploadResult = await uploadImage(image);
          
          if (uploadResult.error) {
            Alert.alert("Erro", `Erro ao fazer upload da imagem: ${uploadResult.error}`);
            setIsSubmitting(false);
            return;
          }
          
          imageUrl = uploadResult.imageUrl;
        }
      }

      // Preparar dados para envio
      const productData = {
        brand: formData.title.trim(), // title é enviado como brand
        model: formData.model.trim(),
        description: formData.description.trim() || "", // Opcional, mas enviado vazio se não preenchido
        currency: formData.currency,
        price: parseFloat(numericPrice.toFixed(2)), // Garantir que seja número decimal com 2 casas
        imageUrl: imageUrl || "http://placeholder-image.com/image.jpg", // URL do Cloudinary ou placeholder
        category: formData.category, // Nova: categoria
        condition: formData.condition, // Nova: condição
      };

      // Log para debug (remover em produção)
      console.log("Dados do produto a serem enviados:", JSON.stringify(productData, null, 2));

      const result = await productService.createProduct(productData);

      if (result.error) {
        console.error("Erro detalhado:", result.error);
        Alert.alert(
          "Erro ao Publicar",
          result.error || "Não foi possível publicar o produto. Verifique os dados e tente novamente."
        );
        setIsSubmitting(false);
        return;
      }

      // Sucesso - mostrar mensagem e navegar
      Alert.alert(
        "Sucesso!",
        "Produto publicado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Erro ao publicar produto:", error);
      Alert.alert(
        "Erro",
        error.message || "Ocorreu um erro ao publicar o produto. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header do Formulário */}
      <FormHeader
        onBackPress={() => navigation.goBack()}
        onActionPress={isSubmitting ? () => {} : handlePublish}
        actionText={isSubmitting ? "Publicando..." : "Publicar"}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Upload de Imagem */}
        <TouchableOpacity onPress={handleImageUploadPress} activeOpacity={0.8}>
          {image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image.uri }}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <Image
                  source={require("../../assets/x-icon.png")}
                  style={styles.removeImageIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <ImageUploadPlaceholder
              maxPhotos={10}
              uploadIcon={require("../../assets/enviarFoto-icon.png")}
              starIcon={require("../../assets/estrelaAmarela-icon.png")}
              tapeIcon={require("../../assets/fita-icon.png")}
            />
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Título (será enviado como brand) */}
          <LabelledTextInput
            label="Título"
            placeholder="Digite o título do item"
            value={formData.title}
            onChangeText={(value) => handleInputChange("title", value)}
          />

          {/* Modelo */}
          <LabelledTextInput
            label="Modelo"
            placeholder="Digite o modelo do item"
            value={formData.model}
            onChangeText={(value) => handleInputChange("model", value)}
          />

          {/* Nova: Categoria */}
          <LabelledDropdown
            label="Categoria"
            value={formData.category ? getCategoryName(formData.category) : ""}
            placeholder="Selecione a categoria"
            onPress={() => setShowCategoryModal(true)}
            icon={require("../../assets/flecha-icon.png")}
            iconColor="#FF007A"
          />

          {/* Nova: Condição */}
          <LabelledDropdown
            label="Condição"
            value={formData.condition ? getConditionName(formData.condition) : ""}
            placeholder="Selecione a condição"
            onPress={() => setShowConditionModal(true)}
            icon={require("../../assets/flecha-icon.png")}
            iconColor="#FF007A"
          />

          {/* Preço */}
          <LabelledTextInput
            label="Preço"
            placeholder="0.00"
            value={formData.price}
            onChangeText={(value) => handleInputChange("price", value)}
            keyboardType="numeric"
          />

          {/* Moeda */}
          <LabelledDropdown
            label="Moeda"
            value={formData.currency}
            placeholder="Selecione uma moeda"
            onPress={() => setShowCurrencyModal(true)}
            icon={require("../../assets/flecha-icon.png")}
            iconColor="#FF007A"
          />

          {/* Descrição (Opcional) */}
          <View>
            <LabelledTextInput
              label="Descrição"
              placeholder="Digite a descrição do item (opcional)"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
              numberOfLines={4}
              style={styles.descriptionInput}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal de Seleção de Moeda */}
      <ActionSheetModal
        isVisible={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title="Selecione a moeda"
        items={currencies}
        onItemSelected={handleCurrencySelect}
        slideAnim={currencySlideAnim}
      />

      {/* Nova: Modal de Seleção de Categoria */}
      <ActionSheetModal
        isVisible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Selecione a categoria"
        items={CATEGORIES.map((cat) => cat.name)}
        onItemSelected={handleCategorySelect}
        slideAnim={categorySlideAnim}
      />

      {/* Nova: Modal de Seleção de Condição */}
      <ActionSheetModal
        isVisible={showConditionModal}
        onClose={() => setShowConditionModal(false)}
        title="Selecione a condição"
        items={CONDITIONS.map((cond) => cond.name)}
        onItemSelected={handleConditionSelect}
        slideAnim={conditionSlideAnim}
      />
    </View>
  );
}
