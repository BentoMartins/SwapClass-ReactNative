import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RESPONSIVE, isSmallScreen, isTablet } from "../utils/responsive";
import SectionHeader from "./SectionHeader";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_MEDIUM,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    marginTop: RESPONSIVE.MARGIN_SMALL,
  },
  descriptionText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    lineHeight: isTablet() ? 26 : 22,
    marginTop: RESPONSIVE.MARGIN_XS,
  },
  bulletPoint: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    lineHeight: isTablet() ? 26 : 22,
    marginTop: RESPONSIVE.MARGIN_XS / 2,
    paddingLeft: RESPONSIVE.PADDING_SMALL,
  },
  highlightText: {
    fontWeight: "bold",
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    marginTop: RESPONSIVE.MARGIN_XS,
  },
});

/**
 * Seção de descrição do produto.
 * @param {string} description - Descrição completa do produto.
 * @param {Array<string>} bulletPoints - Lista de pontos destacados (opcional).
 * @param {string} highlightText - Texto em destaque (opcional, ex: "NUNCA USADA").
 */
export default function ProductDescriptionSection({
  description,
  bulletPoints = [],
  highlightText,
}) {
  return (
    <View style={styles.container}>
      <SectionHeader title="Descrição" />
      {description && (
        <Text style={styles.descriptionText}>{description}</Text>
      )}
      {bulletPoints.map((point, index) => (
        <Text key={index} style={styles.bulletPoint}>
          • {point}
        </Text>
      ))}
      {highlightText && (
        <Text style={styles.highlightText}>{highlightText}</Text>
      )}
    </View>
  );
}

