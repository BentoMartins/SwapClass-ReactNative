import React from "react";
import { View, StyleSheet } from "react-native";
import { RESPONSIVE, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: isTablet()
      ? RESPONSIVE.PADDING_XL
      : RESPONSIVE.PADDING_MEDIUM,
    paddingTop: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_LARGE,
    paddingBottom: isTablet()
      ? RESPONSIVE.PADDING_XL
      : RESPONSIVE.PADDING_LARGE,
  },
});

/**
 * Layout genérico para telas de Feedback (Sucesso/Erro).
 * Centraliza o conteúdo verticalmente e aplica padding responsivo.
 * @param {React.Node} children - O conteúdo a ser exibido dentro do layout.
 */
export default function FeedbackScreenLayout({ children }) {
  return <View style={styles.contentContainer}>{children}</View>;
}
