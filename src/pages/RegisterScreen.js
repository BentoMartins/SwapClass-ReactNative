import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RESPONSIVE, isTablet } from "../utils/responsive";
import { useAuth } from "../contexts/AuthContext";

// Componentes Genéricos
import DecorativeBackground from "../components/DecorativeBackground"; // Reutilizado do Login
import InputWithShadow from "../components/InputWithShadow"; // Novo Componente
import AuthTitleSection from "../components/AuthTitleSection"; // Novo Componente
import CheckboxWithLink from "../components/CheckboxWithLink"; // Novo Componente
import ActionFormButton from "../components/ActionFormButton"; // Novo Componente

// Dados Estáticos para o background
const decorativeImages = [
  {
    source: require("../../assets/icon1-register.png"),
    style: {
      position: "absolute",
      top: isTablet() ? -50 : 20,
      left: isTablet() ? -200 : -135,
      width: isTablet() ? 400 : 280,
      height: isTablet() ? 250 : 180,
    },
  },
  {
    source: require("../../assets/icon2-register.png"),
    style: {
      position: "absolute",
      bottom: isTablet() ? -1700 : -170, // Ajustar conforme a visualização real do Tablet/Scroll
      right: isTablet() ? -60 : -60,
      width: isTablet() ? 350 : 240,
      height: isTablet() ? 600 : 500,
    },
  },
];

// Estilos específicos da tela (layout e containers)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF55CC", // Cor de fundo específica
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: isTablet() ? 80 : 60,
    paddingHorizontal: isTablet()
      ? RESPONSIVE.PADDING_XL
      : RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
    zIndex: 1,
  },
  formSection: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  nameRow: {
    flexDirection: isTablet() ? "row" : "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: RESPONSIVE.MARGIN_SMALL,
  },
  halfInput: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    padding: 30,
    paddingTop: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF007A",
  },
});

export default function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.nome.trim() !== "" &&
      formData.sobrenome.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.senha.trim() !== "" &&
      formData.confirmarSenha.trim() !== "" &&
      aceitaTermos
    );
  };

  const handleRegister = async () => {
    if (!aceitaTermos) {
      Alert.alert(
        "Erro",
        "Você deve aceitar os termos de serviço para continuar."
      );
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (
      !formData.nome ||
      !formData.sobrenome ||
      !formData.email ||
      !formData.senha
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    // Combina nome e sobrenome para enviar como "name"
    const fullName = `${formData.nome} ${formData.sobrenome}`.trim();

    // Envia apenas name, email e password para o microserviço
    const result = await signup(fullName, formData.email, formData.senha);

    if (result.success) {
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Success");
    } else {
      Alert.alert("Erro no Cadastro", result.error || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 1. Componente Genérico DecorativeBackground (Reutilizado) */}
      <DecorativeBackground images={decorativeImages} />

      {/* Botão de Voltar */}
      <TouchableOpacity
        style={[styles.backButton, { top: Math.max(insets.top, 10) }]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/voltar-icon.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 2. Componente Genérico de Título e Subtítulo */}
        <AuthTitleSection
          title="Cadastre-se já"
          subtitle="Junte-se a universitários da sua faculdade e de todo o país."
        />

        {/* Formulário */}
        <View style={styles.formSection}>
          {/* Nome e Sobrenome (Agrupados) */}
          <View style={styles.nameRow}>
            <View style={styles.halfInput}>
              <InputWithShadow
                placeholder="Nome"
                value={formData.nome}
                onChangeText={(value) => handleInputChange("nome", value)}
              />
            </View>
            <View style={styles.halfInput}>
              <InputWithShadow
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChangeText={(value) => handleInputChange("sobrenome", value)}
              />
            </View>
          </View>

          {/* Email Universitário */}
          <InputWithShadow
            placeholder="Email Universitário"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Senha */}
          <InputWithShadow
            placeholder="Senha"
            value={formData.senha}
            onChangeText={(value) => handleInputChange("senha", value)}
            secureTextEntry
          />

          {/* Confirmar Senha */}
          <InputWithShadow
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            onChangeText={(value) => handleInputChange("confirmarSenha", value)}
            secureTextEntry
          />
        </View>

        {/* 3. Componente Genérico de Checkbox e Termos */}
        <CheckboxWithLink
          isChecked={aceitaTermos}
          onToggle={() => setAceitaTermos(!aceitaTermos)}
          termsText="Ao continuar, você confirma e concorda com os Termos de Serviço"
          linkText="Termos de Serviço"
          onLinkPress={() =>
            Alert.alert(
              "Navegar para Termos",
              "Abrir tela de Termos de Serviço"
            )
          }
        />

        {/* 4. Componente Genérico de Botão de Ação do Formulário */}
        <ActionFormButton
          title={loading ? "REGISTRANDO..." : "REGISTRAR"}
          onPress={handleRegister}
          isActive={isFormValid() && !loading}
          activeColor="#3C1342"
          inactiveColor="#5D5D5D"
          style={{ marginTop: -25 }} // Ajuste de margem específico da tela
        />
      </ScrollView>
    </View>
  );
}
