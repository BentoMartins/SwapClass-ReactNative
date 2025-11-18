import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { RESPONSIVE, isTablet, isLargeScreen } from "../utils/responsive";

// Importação dos novos componentes genéricos
import GradientImageHeader from "../components/GradientImageHeader";
import WelcomeContent from "../components/WelcomeContent";
import PrimaryButton from "../components/PrimaryButton";

// Estilos específicos da tela (apenas layout e containers)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageSection: {
    height: isTablet() ? "40%" : isLargeScreen() ? "45%" : "50%",
    position: "relative",
  },
  buttonsSection: {
    flexDirection: isTablet() ? "row" : "row",
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
    justifyContent: "space-between",
    gap: RESPONSIVE.MARGIN_SMALL,
  },
});

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 1. Componente Genérico de Header */}
      <GradientImageHeader
        imageSource={require("../../assets/imagem-capa.png")}
        containerStyle={styles.imageSection} // Mantém a responsividade do container
      />

      {/* 2. Componente Genérico de Conteúdo */}
      <WelcomeContent
        title="BEM-VINDO AO SWAPCLASS!"
        taglinePart1="Novas histórias"
        taglinePart2="para coisas antigas."
      />

      {/* 3. Componentes Genéricos de Botões */}
      <View style={styles.buttonsSection}>
        <PrimaryButton
          title="LOGIN"
          onPress={() => navigation.navigate("Login")}
          variant="primary" // Cor/Estilo Padrão (Dark)
        />

        <PrimaryButton
          title="REGISTRAR"
          onPress={() => navigation.navigate("Register")}
          variant="secondary" // Cor/Estilo Secundário (Pink)
        />
      </View>
    </View>
  );
}
