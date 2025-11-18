import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { RESPONSIVE, isTablet, isLargeScreen } from "../utils/responsive";
import axios from "axios";

// Importação dos novos componentes genéricos
import DecorativeBackground from "../components/DecorativeBackground";
import AuthTitle from "../components/AuthTitle";
import FormField from "../components/FormField";
import ActionButton from "../components/ActionButton";
import LinkText from "../components/LinkText";

// Componentes estáticos para o DecorativeBackground
const decorativeImages = [
  {
    source: require("../../assets/icon1-login.png"),
    style: {
      position: "absolute",
      top: isTablet() ? 60 : 40,
      right: isTablet() ? -200 : -160,
      width: isTablet() ? 400 : 300,
      height: isTablet() ? 400 : 300,
    },
  },
  {
    source: require("../../assets/icon2-login.png"),
    style: {
      position: "absolute",
      bottom: isTablet() ? -180 : -140,
      left: isTablet() ? -100 : -80,
      width: isTablet() ? 400 : 300,
      height: isTablet() ? 400 : 300,
    },
  },
];

// Estilos específicos da tela (apenas layout e containers)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEA00", // Cor de fundo específica
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
  formSection: {
    marginBottom: RESPONSIVE.MARGIN_XL,
  },
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //login function (Lógica de Negócio Mantida)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos de email e senha.");
      return;
    }

    setIsLoading(true);

    try {
      const userResponse = await axios.get("https://fakestoreapi.com/users");
      const users = await userResponse.data;

      const userExists = users.find((user) => user.email === email);

      if (!userExists) {
        throw new Error("Usuário não encontrado.");
      }

      await axios.post("https://fakestoreapi.com/auth/login", {
        username: userExists.username,
        password: password,
      });

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.replace("Home");
    } catch (error) {
      let errorMessage = "Ocorreu um erro. Tente novamente.";

      if (error.response && error.response.data) {
        errorMessage = error.response.data;
      } else if (error.request) {
        errorMessage =
          "Não foi possível conectar ao servidor. Verifique sua internet.";
      } else {
        errorMessage = error.message;
      }

      Alert.alert("Erro no Login", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 1. Componente Genérico de Elementos Decorativos */}
      <DecorativeBackground images={decorativeImages} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 2. Componente Genérico de Título */}
        <AuthTitle title="Login" />

        {/* Formulário */}
        <View style={styles.formSection}>
          {/* 3. Componente Genérico de Campo de Formulário (Email) */}
          <FormField
            label="Email universitário"
            placeholder="nome.sobrenome@universidade.edu.br"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* 3. Componente Genérico de Campo de Formulário (Senha) */}
          <FormField
            label="Senha"
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* 5. Componente Genérico de Link de Texto (Esqueceu senha) */}
          <LinkText
            text="Esqueceu sua senha?"
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ marginTop: -30, alignSelf: "flex-end" }} // Estilos customizados
            isUnderlined // Propriedade para sublinhado
          />
        </View>

        {/* 4. Componente Genérico de Botão de Ação */}
        <ActionButton
          title="LOGIN"
          onPress={handleLogin}
          isLoading={isLoading}
          backgroundColor="#FF007A" // Cor de fundo específica
          textColor="#fff"
        />

        {/* 5. Componente Genérico de Link de Texto (Criar Conta) */}
        <LinkText
          text="Não tem uma conta? Crie uma."
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: RESPONSIVE.MARGIN_XS, alignSelf: "center" }} // Estilos customizados
          color="#5D5D5D" // Cor customizada
        />
      </ScrollView>
    </View>
  );
}
