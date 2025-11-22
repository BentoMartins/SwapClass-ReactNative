import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";

// Componentes
import FormHeader from "../components/FormHeader";
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
    paddingTop: 35,
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
  sectionTitle: {
    fontSize: RESPONSIVE.SUBTITLE,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    marginTop: RESPONSIVE.MARGIN_SMALL,
  },
  photoSection: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FF007A",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: RESPONSIVE.MARGIN_SMALL,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoPlaceholderIcon: {
    width: 50,
    height: 50,
    tintColor: "#FFFFFF",
  },
  changePhotoButton: {
    alignSelf: "center",
    paddingVertical: RESPONSIVE.PADDING_XS,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
  },
  changePhotoText: {
    fontSize: RESPONSIVE.BODY_SMALL,
    color: "#FF007A",
    fontWeight: "600",
  },
  passwordSection: {
    marginTop: RESPONSIVE.MARGIN_MEDIUM,
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
});

export default function EditDataScreen({ navigation }) {
  // Estados dos campos do formulário
  const [formData, setFormData] = useState({
    email: "usuario@atitus.edu.br",
    newEmail: "",
    phone: "(54) 99999-1603",
    newPhone: "",
    currentPassword: "senha123456",
    newPassword: "",
    confirmPassword: "",
  });

  // Estados de edição para cada campo
  const [editingFields, setEditingFields] = useState({
    email: false,
    phone: false,
    password: false,
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.email || !formData.phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de senha
    if (editingFields.password && formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
      }
      if (!formData.currentPassword) {
        Alert.alert("Erro", "Digite sua senha atual para alterar a senha.");
        return;
      }
    }

    // Fechar todos os campos de edição
    setEditingFields({
      email: false,
      phone: false,
      password: false,
    });

    // TODO: Implementar chamada à API para salvar os dados
    Alert.alert("Sucesso", "Dados atualizados com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handlePhotoChange = () => {
    // TODO: Implementar seleção de imagem da galeria/câmera
    Alert.alert(
      "Alterar foto",
      "Escolha uma opção",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Câmera", onPress: () => console.log("Abrir câmera") },
        { text: "Galeria", onPress: () => console.log("Abrir galeria") },
      ],
      { cancelable: true }
    );
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
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (!domain) return email;
    const maskedLocal = "*".repeat(Math.min(localPart.length, 7));
    return `${maskedLocal}@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    // Formato: (54) *****-1603
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) return phone;
    const areaCode = cleaned.substring(0, 2);
    const firstPart = cleaned.substring(2, 7);
    const lastPart = cleaned.substring(7);
    return `(${areaCode}) ${"*".repeat(firstPart.length)}-${lastPart}`;
  };

  const maskPassword = (password) => {
    if (!password) return "";
    return "*".repeat(Math.min(password.length, 10));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header do formulário */}
      <FormHeader
        onBackPress={handleBackPress}
        onActionPress={handleSave}
        actionText="Salvar"
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Foto de Perfil */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Foto de perfil</Text>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={handlePhotoChange}
            activeOpacity={0.8}
          >
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.photoImage} />
            ) : (
              <Image
                source={require("../../assets/user-icon.png")}
                style={styles.photoPlaceholderIcon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handlePhotoChange}
          >
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Linha divisória */}
        <View style={styles.divider} />

        {/* Seção de Informações Pessoais */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Informações pessoais</Text>

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
            <LabelledTextInput
              label="Novo email"
              value={formData.newEmail}
              onChangeText={(value) => updateField("newEmail", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="nome.sobrenome@universidade.edu.br"
            />
          )}

          {/* Linha divisória entre Email e Telefone */}
          <View style={styles.divider} />

          <EditableField
            label="Número de telefone"
            value={formData.phone}
            onChangeText={(value) => updateField("phone", value)}
            onMaskValue={maskPhone}
            isEditing={editingFields.phone}
            onEditPress={() => handleEditField("phone")}
            onBlur={() => handleFieldBlur("phone")}
            keyboardType="phone-pad"
            placeholder="(00) 00000-0000"
          />

          {/* Campo "Novo número de telefone" aparece quando está editando o telefone */}
          {editingFields.phone && (
            <LabelledTextInput
              label="Novo número de telefone"
              value={formData.newPhone}
              onChangeText={(value) => updateField("newPhone", value)}
              keyboardType="phone-pad"
              placeholder="Número de celular"
            />
          )}
        </View>

        {/* Linha divisória */}
        <View style={styles.divider} />

        {/* Seção de Senha */}
        <View style={styles.passwordSection}>
          <Text style={styles.sectionTitle}>Alteração de senha</Text>

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

          {/* Campos "Nova senha" e "Confirmar senha" aparecem quando está editando a senha */}
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

