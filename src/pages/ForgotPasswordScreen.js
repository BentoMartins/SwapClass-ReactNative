import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator, // Adicionado para exibir o loading no botão
} from "react-native";
import { RESPONSIVE, isTablet } from "../utils/responsive";

// Componentes Genéricos
import InputWithShadow from "../components/InputWithShadow"; // Reutilizado
import ShadowButton from "../components/ShadowButton"; // Reutilizado
import RecoveryIllustration from "../components/RecoveryIllustration"; // Novo Componente
import CustomModal from "../components/CustomModal"; // Novo Componente

// Dados Estáticos para o Modal de Sucesso
const modalSuccessContent = {
  title: "Sucesso!",
  message: "Um e-mail com o link para redefinir sua senha foi enviado.",
  decorationImage: require("../../assets/estrela-icon.png"),
  centralImage: require("../../assets/carta-icon.png"),
};

// Estilos específicos da tela (layout e containers)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFAEE7",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: isTablet() ? 80 : 60,
    paddingHorizontal: isTablet()
      ? RESPONSIVE.PADDING_XL
      : RESPONSIVE.PADDING_LARGE,
    paddingBottom: RESPONSIVE.PADDING_XL,
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    marginBottom: -5,
  },
  buttonsSection: {
    gap: RESPONSIVE.MARGIN_MEDIUM,
  },
  inputContainer: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
});

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSendRecoveryEmail = async () => {
    // ... (Lógica de validação de email e API mantida)
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu e-mail.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, digite um e-mail válido.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título */}
        <Text style={styles.title}>Recuperação de senha</Text>

        {/* 4. Componente Genérico de Ilustração */}
        <RecoveryIllustration
          imageSource={require("../../assets/icon-senha.png")}
        />

        {/* Formulário */}
        <View style={styles.inputContainer}>
          {/* 2. Componente Genérico de Input com Sombra (Reutilizado) */}
          <InputWithShadow
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{ marginBottom: 0 }} // Ajuste de margem
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonsSection}>
          {/* 3. Botão Enviar Email (Reutilizado ShadowButton) */}
          <ShadowButton
            title={
              isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "ENVIAR EMAIL DE RECUPERAÇÃO"
              )
            }
            onPress={handleSendRecoveryEmail}
            disabled={isLoading}
            backgroundColor="#FF007A"
            style={{ marginTop: -15 }}
          />

          {/* 3. Botão Voltar ao Login (Reutilizado ShadowButton) */}
          <ShadowButton
            title="VOLTAR AO LOGIN"
            onPress={handleBackToLogin}
            backgroundColor="#fff"
            textColor="#3C1342"
            style={{
              marginTop: -10,
              borderColor: "#3C1342", // Customizando a cor da borda/sombra para o secundário
            }}
          />
        </View>
      </ScrollView>

      {/* 5. Componente Genérico de Modal Customizado */}
      <CustomModal
        isVisible={showSuccessModal}
        onClose={handleModalClose}
        title={modalSuccessContent.title}
        message={modalSuccessContent.message}
        decorationImage={modalSuccessContent.decorationImage}
        centralImage={modalSuccessContent.centralImage}
        buttonText="OK"
        buttonColor="#FF007A"
      />
    </View>
  );
}
