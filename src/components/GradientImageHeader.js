import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: RESPONSIVE.MARGIN_SMALL,
  },
});

/**
 * Header genérico com imagem de fundo e gradiente de transição.
 * @param {number} imageSource - Requisito da imagem (ex: require('...')).
 * @param {object} containerStyle - Estilos para o container principal (ex: altura).
 */
export default function GradientImageHeader({ imageSource, containerStyle }) {
  return (
    <View style={[styles.imageContainer, containerStyle]}>
      <Image
        source={imageSource}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[
          "transparent",
          "rgba(255,255,255,0.3)",
          "rgba(255,255,255,0.7)",
          "#fff",
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradientOverlay}
      />
    </View>
  );
}
