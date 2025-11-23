import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";

// Componentes
import AppHeader from "../components/AppHeader";
import EditableField from "../components/EditableField";
import LabelledTextInput from "../components/LabelledTextInput";
import PrimaryButton from "../components/PrimaryButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  contentContainer: {
    paddingHorizontal: RESPONSIVE.PADDING_LARGE,
    paddingVertical: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
  },
  formSection: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_LARGE,
    marginTop: RESPONSIVE.MARGIN_MEDIUM,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: RESPONSIVE.SUBTITLE,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    marginTop: RESPONSIVE.MARGIN_SMALL,
  },
  divider: {
    height: 1,
    backgroundColor: "#D0D0D0",
    marginVertical: 20,
    width: "100%",
  },
  saveButton: {
    marginTop: RESPONSIVE.MARGIN_LARGE,
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    width: "100%",
    flex: 0,
  },
  backButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    marginTop: 8,
  },
  backButtonText: {
    color: "#FF007A",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default function PersonalDetailsScreen({ navigation }) {
  // Estados dos campos do formulário
  const [formData, setFormData] = useState({
    fullName: "João Silva Santos",
    newFullName: "",
    email: "joao.silva@atitus.edu.br",
    newEmail: "",
  });

  // Estados de edição para cada campo
  const [editingFields, setEditingFields] = useState({
    fullName: false,
    email: false,
  });

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.fullName || !formData.email) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Fechar todos os campos de edição
    setEditingFields({
      fullName: false,
      email: false,
    });

    // TODO: Implementar chamada à API para salvar os dados
    Alert.alert("Sucesso", "Dados atualizados com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditField = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleFieldBlur = (field) => {
    // Quando o campo perde o foco, sai do modo de edição
    setEditingFields((prev) => ({
      ...prev,
      [field]: false,
    }));

    // Limpar campos novos ao cancelar edição
    if (field === "fullName") {
      setFormData((prev) => ({ ...prev, newFullName: "" }));
    } else if (field === "email") {
      setFormData((prev) => ({ ...prev, newEmail: "" }));
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (!domain) return email;
    const maskedLocal = "*".repeat(Math.min(localPart.length, 7));
    return `${maskedLocal}@${domain}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header padrão do SwapClass */}
      <AppHeader title="SwapClass" onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Título da página */}
        <Text style={styles.pageTitle}>Detalhes pessoais</Text>

        {/* Seção de Informações Pessoais */}
        <View style={styles.formSection}>
          <EditableField
            label="Nome completo"
            value={formData.fullName}
            onChangeText={(value) => updateField("fullName", value)}
            isEditing={editingFields.fullName}
            onEditPress={() => handleEditField("fullName")}
            onBlur={() => handleFieldBlur("fullName")}
            placeholder="Digite seu nome completo"
          />

          {/* Campo "Novo nome completo" aparece quando está editando */}
          {editingFields.fullName && (
            <>
              <LabelledTextInput
                label="Novo nome completo"
                value={formData.newFullName}
                onChangeText={(value) => updateField("newFullName", value)}
                placeholder="Digite seu novo nome completo"
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => handleFieldBlur("fullName")}
              >
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Linha divisória */}
          <View style={styles.divider} />

          <EditableField
            label="Email universitário"
            value={formData.email}
            onChangeText={(value) => updateField("email", value)}
            onMaskValue={maskEmail}
            isEditing={editingFields.email}
            onEditPress={() => handleEditField("email")}
            onBlur={() => handleFieldBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@atitus.edu.br"
          />

          {/* Campo "Novo email" aparece quando está editando o email */}
          {editingFields.email && (
            <>
              <LabelledTextInput
                label="Novo email"
                value={formData.newEmail}
                onChangeText={(value) => updateField("newEmail", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="nome.sobrenome@universidade.edu.br"
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => handleFieldBlur("email")}
              >
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Botão de Salvar */}
        <PrimaryButton
          title="SALVAR ALTERAÇÕES"
          onPress={handleSave}
          variant="secondary"
          style={styles.saveButton}
        />
      </ScrollView>
    </View>
  );
}

