import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Image,
  Modal,
  Animated,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

// Componentes Genéricos
import FormHeader from "../components/FormHeader"; // Novo Componente
import ImageUploadPlaceholder from "../components/ImageUploadPlaceholder"; // Novo Componente
import LabelledTextInput from "../components/LabelledTextInput"; // Novo Componente
import LabelledDropdown from "../components/LabelledDropdown"; // Novo Componente
import OptionGroup from "../components/OptionGroup"; // Novo Componente
import ActionSheetModal from "../components/ActionSheetModal"; // Novo Componente

// Dados Estáticos (Mantidos na tela para gerenciamento local)
const categories = [
  "Móveis e artigos de decoração",
  "Eletrônicos",
  "Roupas e acessórios",
  "Tênis",
  "Livros e revistas",
  "Outros",
];
const conditions = [
  "Novo - Nunca usado",
  "Usado - Condição de novo",
  "Usado - Bom estado",
  "Usado - Mal estado",
];
const optionalOptions = [
  { text: "Localização", icon: require("../../assets/planeta-icon.png") },
  { text: "Universidade", icon: require("../../assets/escola-icon.png") },
];

// Estilos específicos da tela (layout e containers)
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#000",
  },
  modalButtonConfirm: {
    backgroundColor: "#FF007A",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalButtonTextCancel: {
    color: "#000",
  },
  modalButtonTextConfirm: {
    color: "#FFFFFF",
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "left",
    paddingLeft: 0,
  },
  successModalIcon: {
    width: "90%",
    height: "50%",
    maxWidth: 400,
    maxHeight: 400,
  },
});

export default function SellScreen({ navigation }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    location: "",
    university: "",
  });
  const [photos, setPhotos] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [universityInput, setUniversityInput] = useState("");

  // Animações para os modais (Mantidas localmente, mas a lógica de useEffect foi movida para o ActionSheetModal)
  const slideAnim = useRef(new Animated.Value(300)).current;
  const conditionSlideAnim = useRef(new Animated.Value(300)).current;

  // ... (Lógica de handleInputChange, handlePublish)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePublish = () => {
    // Validação dos campos obrigatórios
    if (!formData.title.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o título do item.");
      return;
    }

    if (!formData.price.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o preço do item.");
      return;
    }

    // Validar se o preço é um número válido
    const priceValue = formData.price.replace(/[^\d,.-]/g, "").replace(",", ".");
    if (isNaN(parseFloat(priceValue)) || parseFloat(priceValue) <= 0) {
      Alert.alert("Preço inválido", "Por favor, insira um preço válido.");
      return;
    }

    if (!formData.category.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, selecione uma categoria.");
      return;
    }

    if (!formData.condition.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, selecione a condição do item.");
      return;
    }

    if (!formData.location.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha a localização.");
      return;
    }

    if (!formData.university.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha a universidade.");
      return;
    }

    // Todos os campos obrigatórios estão preenchidos
    console.log("Publicando item:", { ...formData, photos });
    
    // Mostrar modal de sucesso
    setShowSuccessModal(true);
    
    // Fechar modal e navegar após 3 segundos
    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.navigate("Home");
    }, 3000);
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category: category }));
    setShowCategoryModal(false);
  };

  const handleConditionSelect = (condition) => {
    setFormData((prev) => ({ ...prev, condition: condition }));
    setShowConditionModal(false);
  };

  const handleOptionPress = (optionText) => {
    if (optionText === "Localização") {
      setLocationInput(formData.location || "");
      setShowLocationModal(true);
    } else if (optionText === "Universidade") {
      setUniversityInput(formData.university || "");
      setShowUniversityModal(true);
    }
  };

  const handleLocationSelect = () => {
    if (locationInput.trim()) {
      setFormData((prev) => ({ ...prev, location: locationInput.trim() }));
      setShowLocationModal(false);
    } else {
      Alert.alert("Erro", "Por favor, digite um endereço.");
    }
  };

  const handleUniversitySave = () => {
    if (universityInput.trim()) {
      setFormData((prev) => ({ ...prev, university: universityInput.trim() }));
      setShowUniversityModal(false);
    } else {
      Alert.alert("Erro", "Por favor, digite o nome da universidade.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Componente Genérico de Header do Formulário */}
      <FormHeader
        onBackPress={() => navigation.goBack()}
        onActionPress={handlePublish}
        actionText="Publicar"
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 2. Componente Genérico de Upload de Imagem */}
        <ImageUploadPlaceholder
          maxPhotos={10}
          uploadIcon={require("../../assets/enviarFoto-icon.png")}
          starIcon={require("../../assets/estrelaAmarela-icon.png")}
          tapeIcon={require("../../assets/fita-icon.png")}
        />

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* 3. Componente Genérico de Input com Label */}
          <LabelledTextInput
            label="Título"
            placeholder="Digite o título do item"
            value={formData.title}
            onChangeText={(value) => handleInputChange("title", value)}
          />

          <LabelledTextInput
            label="Preço"
            placeholder="R$ 0,00"
            value={formData.price}
            onChangeText={(value) => handleInputChange("price", value)}
            keyboardType="numeric"
          />

          {/* 4. Componente Genérico de Dropdown (Touch) */}
          <LabelledDropdown
            label="Categoria"
            value={formData.category}
            placeholder="Selecione uma categoria"
            onPress={() => setShowCategoryModal(true)}
            icon={require("../../assets/flecha-icon.png")}
            iconColor="#FF007A"
          />

          <LabelledDropdown
            label="Condição"
            value={formData.condition}
            placeholder="Selecione a condição"
            onPress={() => setShowConditionModal(true)}
            icon={require("../../assets/flecha-icon.png")}
            iconColor="#FF007A"
          />

          <View>
            <Text style={styles.optionalLabel}>Opcional</Text>
            <LabelledTextInput
              placeholder="Descrição"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
              numberOfLines={4}
              style={styles.descriptionInput} // Passa estilos específicos para o input
              showLabel={false} // Não mostra o label do componente, usa o 'Opcional'
            />
          </View>
        </View>

        {/* 5. Componente Genérico de Grupo de Opções */}
        <OptionGroup
          options={optionalOptions}
          onOptionPress={handleOptionPress}
          plusIcon={require("../../assets/mais-icon.png")}
          values={{
            "Localização": formData.location,
            "Universidade": formData.university,
          }}
        />
      </ScrollView>

      {/* 6. Componente Genérico de Modal de Ação (Categoria) */}
      <ActionSheetModal
        isVisible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Selecione a categoria"
        items={categories}
        onItemSelected={handleCategorySelect}
        slideAnim={slideAnim} // Passa a animação
      />

      {/* 6. Componente Genérico de Modal de Ação (Condição) */}
      <ActionSheetModal
        isVisible={showConditionModal}
        onClose={() => setShowConditionModal(false)}
        title="Selecione a condição"
        items={conditions}
        onItemSelected={handleConditionSelect}
        slideAnim={conditionSlideAnim} // Passa a animação
      />

      {/* Modal de Localização */}
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowLocationModal(false)}
          >
            <View style={{ flex: 1 }} />
          </TouchableOpacity>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Selecionar Localização</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite o endereço ou localização"
              value={locationInput}
              onChangeText={setLocationInput}
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextCancel]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleLocationSelect}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de Universidade */}
      <Modal
        visible={showUniversityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUniversityModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowUniversityModal(false)}
          >
            <View style={{ flex: 1 }} />
          </TouchableOpacity>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Nome da Universidade</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite o nome da sua universidade"
              value={universityInput}
              onChangeText={setUniversityInput}
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowUniversityModal(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextCancel]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleUniversitySave}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.successModalOverlay}>
          <Image
            source={require("../../assets/modalSucesso-icon.png")}
            style={styles.successModalIcon}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}
