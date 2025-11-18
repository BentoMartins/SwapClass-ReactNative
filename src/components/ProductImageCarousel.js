import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { RESPONSIVE, isSmallScreen, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: isTablet() ? 400 : isSmallScreen() ? 300 : 350,
    backgroundColor: "#f5f5f5",
    resizeMode: "cover",
  },
  imageIndicator: {
    position: "absolute",
    bottom: RESPONSIVE.PADDING_SMALL,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: RESPONSIVE.PADDING_XS / 2,
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
  },
  indicatorText: {
    color: "#fff",
    fontSize: RESPONSIVE.CAPTION,
    fontWeight: "500",
  },
});

/**
 * Componente de imagem do produto com indicador de página.
 * @param {string|number} imageUri - URI ou require da imagem do produto.
 * @param {number} currentIndex - Índice da imagem atual (começando em 1).
 * @param {number} totalImages - Total de imagens.
 */
export default function ProductImageCarousel({
  imageUri,
  currentIndex = 1,
  totalImages = 1,
}) {
  return (
    <View style={styles.container}>
      <Image
        source={typeof imageUri === "string" ? { uri: imageUri } : imageUri}
        style={styles.image}
        resizeMode="cover"
      />
      {totalImages > 1 && (
        <View style={styles.imageIndicator}>
          <Text style={styles.indicatorText}>
            {currentIndex}/{totalImages}
          </Text>
        </View>
      )}
    </View>
  );
}

