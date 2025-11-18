import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RESPONSIVE, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: RESPONSIVE.MARGIN_XL,
  },
  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginBottom: isTablet()
      ? RESPONSIVE.MARGIN_LARGE
      : RESPONSIVE.MARGIN_MEDIUM,
    lineHeight: isTablet() ? 40 : 32,
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
  },
  icon: {
    width: 230,
    height: 230,
    marginBottom: isTablet()
      ? RESPONSIVE.MARGIN_LARGE
      : RESPONSIVE.MARGIN_MEDIUM,
  },
  message: {
    fontSize: 27,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginBottom: isTablet() ? RESPONSIVE.MARGIN_XL : RESPONSIVE.MARGIN_LARGE,
    lineHeight: isTablet() ? 36 : 28,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
  },
});

/**
 * Conteúdo central genérico para telas de Feedback.
 * @param {string} title - O título principal do feedback.
 * @param {number} iconSource - URI/require da imagem do ícone central.
 * @param {string} message - A mensagem de boas-vindas/contexto.
 */
export default function FeedbackContent({ title, iconSource, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
