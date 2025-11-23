import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Animated,
} from "react-native";

// Componentes Genéricos
import FormHeader from "../components/FormHeader";
import ImageUploadPlaceholder from "../components/ImageUploadPlaceholder";
import LabelledTextInput from "../components/LabelledTextInput";
import LabelledDropdown from "../components/LabelledDropdown";
import ActionSheetModal from "../components/ActionSheetModal";

// Services e Contexts
import productService from "../services/product";
import { useCurrency } from "../contexts/CurrencyContext";

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
});

export default function SellScreen({ navigation }) {
  const { currency } = useCurrency();
  
  const [formData, setFormData] = useState({
    title: "", // Será enviado como brand
    model: "",
    price: "",
    description: "",
    currency: currency, // Inicializa com a moeda do contexto
  });
  
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animação para o modal de moeda
  const currencySlideAnim = useRef(new Animated.Value(300)).current;

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

  const handlePublish = async () => {
    // Validação dos campos obrigatórios
    if (!formData.title.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha a marca do item.");
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

    // Preparar dados para envio
    const productData = {
      brand: formData.title.trim(), // title é enviado como brand
      model: formData.model.trim(),
      description: formData.description.trim() || "", // Opcional, mas enviado vazio se não preenchido
      currency: formData.currency,
      price: numericPrice,
      imageUrl: "http://placeholder-image.com/image.jpg", // Valor placeholder para aceitar a requisição
    };

    setIsSubmitting(true);

    try {
      const result = await productService.createProduct(productData);

      if (result.error) {
        Alert.alert("Erro", result.error);
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
        <ImageUploadPlaceholder
          maxPhotos={10}
          uploadIcon={require("../../assets/enviarFoto-icon.png")}
          starIcon={require("../../assets/estrelaAmarela-icon.png")}
          tapeIcon={require("../../assets/fita-icon.png")}
        />

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Título (será enviado como brand) */}
          <LabelledTextInput
            label="Marca"
            placeholder="Digite a marca do item"
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
    </View>
  );
}
