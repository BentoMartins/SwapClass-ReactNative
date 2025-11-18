import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { RESPONSIVE, isTablet } from "../utils/responsive";

// Componentes Genéricos
import FeedbackScreenLayout from "../components/FeedbackScreenLayout";
import FeedbackContent from "../components/FeedbackContent";
import ShadowButton from "../components/ShadowButton";

// Estilos específicos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF55CC",
  },
});

export default function SuccessScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <FeedbackScreenLayout>
        <FeedbackContent
          title="Cadastro concluído com sucesso!"
          iconSource={require("../../assets/icon-sentado.png")}
          message="Seja bem-vindo(a) ao seu marketplace universitário."
        />

        {/* Usando o novo ShadowButton com cores customizadas */}
        <ShadowButton
          title="CONTINUAR"
          onPress={handleContinue}
          backgroundColor="#FF1493" // Cor específica da tela
          textColor="#fff"
          style={{ paddingHorizontal: 100 }}
        />
      </FeedbackScreenLayout>
    </View>
  );
}
