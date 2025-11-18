import React from "react";
import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});

/**
 * Container para elementos decorativos (geralmente imagens ou blobs) posicionados no fundo da tela.
 * @param {Array<{source: number, style: object}>} images - Array de objetos contendo a source da imagem e seus estilos de posicionamento.
 */
export default function DecorativeBackground({ images = [] }) {
  return (
    <View style={styles.container}>
      {images.map((img, index) => (
        <Image
          key={index}
          source={img.source}
          style={img.style}
          resizeMode="contain"
        />
      ))}
    </View>
  );
}
