import React from "react";
import { Image, StyleSheet } from "react-native";
import { RESPONSIVE, isSmallScreen, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: isTablet() ? 400 : isSmallScreen() ? 250 : 300, // Altura responsiva
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
  },
});

/**
 * Componente de imagem para produto com estilo de borda de sombra customizado.
 * @param {string} imageUri - URI da imagem do produto.
 * @param {string} resizeMode - Modo de redimensionamento (default: 'contain').
 * @param {object} style - Estilos adicionais para o componente Image.
 */
export default function ProductImageWithShadow({
  imageUri,
  resizeMode = "contain",
  style,
}) {
  return (
    <Image
      source={{ uri: imageUri }}
      style={[styles.image, style]}
      resizeMode={resizeMode}
    />
  );
}
