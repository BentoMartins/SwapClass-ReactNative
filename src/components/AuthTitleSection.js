import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RESPONSIVE, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  titleSection: {
    marginBottom: RESPONSIVE.MARGIN_XL,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
    marginBottom: -55,
    paddingVertical: 70,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#000",
    textAlign: "center",
    lineHeight: isTablet() ? 28 : 24,
    marginBottom: -8,
  },
});

/**
 * Seção genérica para Título principal e Subtítulo descritivo em telas de autenticação/registro.
 * @param {string} title - O título principal (Cadastre-se já).
 * @param {string} subtitle - O subtítulo descritivo (Junte-se a...).
 * @param {object} containerStyle - Estilos para o container principal.
 */
export default function AuthTitleSection({ title, subtitle, containerStyle }) {
  return (
    <View style={[styles.titleSection, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
