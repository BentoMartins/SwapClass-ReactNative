import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  welcomeSection: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_LARGE,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FF007A",
    marginBottom: 30,
    letterSpacing: 1,
    textAlign: "center",
  },
  taglineContainer: {
    alignItems: "center",
  },
  taglineFirst: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3C1342",
    marginBottom: -RESPONSIVE.MARGIN_XS,
    textAlign: "center",
  },
  taglineSecond: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FF007A",
    textAlign: "center",
  },
});

/**
 * Seção de conteúdo genérico para boas-vindas/slogan.
 * @param {string} title - Título principal (BEM-VINDO...).
 * @param {string} taglinePart1 - Primeira parte do slogan.
 * @param {string} taglinePart2 - Segunda parte do slogan.
 */
export default function WelcomeContent({ title, taglinePart1, taglinePart2 }) {
  return (
    <View style={styles.welcomeSection}>
      <Text style={styles.welcomeText}>{title}</Text>
      <View style={styles.taglineContainer}>
        <Text style={styles.taglineFirst}>{taglinePart1}</Text>
        <Text style={styles.taglineSecond}>{taglinePart2}</Text>
      </View>
    </View>
  );
}
