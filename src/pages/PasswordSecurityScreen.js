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

export default function PasswordSecurityScreen({ navigation }) {
  // Estados dos campos do formulário
  const [formData, setFormData] = useState({
    currentPassword: "senha123456",
    newPassword: "",
    confirmPassword: "",
  });

  // Estados de edição
  const [editingFields, setEditingFields] = useState({
    password: false,
  });

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Validações
    if (!formData.currentPassword) {
      Alert.alert("Erro", "Por favor, digite sua senha atual.");
      return;
    }

    if (!formData.newPassword) {
      Alert.alert("Erro", "Por favor, digite sua nova senha.");
      return;
    }

    if (formData.newPassword.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Fechar o campo de edição
    setEditingFields({
      password: false,
    });

    // TODO: Implementar chamada à API para salvar a senha
    Alert.alert("Sucesso", "Senha alterada com sucesso!", [
      {
        text: "OK",
        onPress: () => {
          // Limpar campos
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          navigation.goBack();
        },
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
    setEditingFields((prev) => ({
      ...prev,
      [field]: false,
    }));

    // Limpar campos novos ao cancelar edição
    if (field === "password") {
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    }
  };

  const maskPassword = (password) => {
    if (!password) return "";
    return "*".repeat(Math.min(password.length, 10));
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
        <Text style={styles.pageTitle}>Senhas e segurança</Text>

        {/* Seção de Alteração de Senha */}
        <View style={styles.formSection}>
          <EditableField
            label="Senha atual"
            value={formData.currentPassword}
            onChangeText={(value) => updateField("currentPassword", value)}
            onMaskValue={maskPassword}
            isEditing={editingFields.password}
            onEditPress={() => handleEditField("password")}
            onBlur={() => handleFieldBlur("password")}
            secureTextEntry
            placeholder="Digite sua senha atual"
          />

          {/* Campos "Nova senha" e "Confirmar senha" aparecem quando está editando */}
          {editingFields.password && (
            <>
              <LabelledTextInput
                label="Nova senha"
                value={formData.newPassword}
                onChangeText={(value) => updateField("newPassword", value)}
                secureTextEntry
                placeholder="Digite sua nova senha"
              />

              <LabelledTextInput
                label="Confirmar senha"
                value={formData.confirmPassword}
                onChangeText={(value) => updateField("confirmPassword", value)}
                secureTextEntry
                placeholder="Confirme sua nova senha"
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => handleFieldBlur("password")}
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

