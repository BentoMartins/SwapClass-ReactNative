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
import ImageUploadPlaceholder from "../components/ImageUploadPlaceholder";
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
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: RESPONSIVE.MARGIN_SMALL,
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoPlaceholderIcon: {
    width: 50,
    height: 50,
    tintColor: "#FF007A",
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
    email: "usuario@exemplo.com",
    phone: "(51) 99999-9999",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      Alert.alert("Erro", "Digite sua senha atual para alterar a senha.");
      return;
    }

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
          <Text style={styles.sectionTitle}>Foto de Perfil</Text>
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

        {/* Seção de Informações Pessoais */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <LabelledTextInput
            label="E-mail"
            value={formData.email}
            onChangeText={(value) => updateField("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@email.com"
          />

          <LabelledTextInput
            label="Número de Telefone"
            value={formData.phone}
            onChangeText={(value) => updateField("phone", value)}
            keyboardType="phone-pad"
            placeholder="(00) 00000-0000"
          />
        </View>

        {/* Seção de Senha */}
        <View style={styles.passwordSection}>
          <Text style={styles.sectionTitle}>Alterar Senha</Text>
          <Text
            style={{
              fontSize: RESPONSIVE.BODY_SMALL,
              color: "#666",
              marginBottom: RESPONSIVE.MARGIN_SMALL,
            }}
          >
            Deixe em branco se não quiser alterar a senha
          </Text>

          <LabelledTextInput
            label="Senha Atual"
            value={formData.currentPassword}
            onChangeText={(value) => updateField("currentPassword", value)}
            secureTextEntry
            placeholder="Digite sua senha atual"
          />

          <LabelledTextInput
            label="Nova Senha"
            value={formData.newPassword}
            onChangeText={(value) => updateField("newPassword", value)}
            secureTextEntry
            placeholder="Digite sua nova senha"
          />

          <LabelledTextInput
            label="Confirmar Nova Senha"
            value={formData.confirmPassword}
            onChangeText={(value) => updateField("confirmPassword", value)}
            secureTextEntry
            placeholder="Confirme sua nova senha"
          />
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

