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
});

export default function SellScreen({ navigation }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);

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
    console.log("Publicando item:", formData);
    navigation.navigate("Home");
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category: category }));
    setShowCategoryModal(false);
  };

  const handleConditionSelect = (condition) => {
    setFormData((prev) => ({ ...prev, condition: condition }));
    setShowConditionModal(false);
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
          onOptionPress={(text) => console.log(`Opção pressionada: ${text}`)}
          plusIcon={require("../../assets/mais-icon.png")}
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
    </View>
  );
}
