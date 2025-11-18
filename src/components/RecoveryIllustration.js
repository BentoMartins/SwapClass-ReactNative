import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  illustration: {
    width: isTablet() ? 400 : 400,
    height: isTablet() ? 300 : 250,
  },
});

/**
 * Ilustração central genérica para telas de recuperação de senha.
 * @param {number} imageSource - URI/require da imagem.
 */
export default function RecoveryIllustration({ imageSource }) {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}
