import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RESPONSIVE, isSmallScreen, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  detailsContainer: {
    padding: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_MEDIUM,
  },
  category: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.BODY_SMALL
      : isTablet()
      ? RESPONSIVE.BODY_MEDIUM
      : RESPONSIVE.BODY_SMALL,
    color: "#6c757d",
    marginBottom: RESPONSIVE.MARGIN_XS,
    textTransform: "capitalize",
  },
  title: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.SUBTITLE
      : isTablet()
      ? RESPONSIVE.SUBTITLE * 1.2
      : RESPONSIVE.SUBTITLE,
    fontWeight: "bold",
    marginBottom: RESPONSIVE.MARGIN_XS,
    lineHeight: isTablet() ? 30 : 26,
  },
  price: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.TITLE_SMALL
      : isTablet()
      ? RESPONSIVE.TITLE_MEDIUM
      : RESPONSIVE.TITLE_SMALL,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: RESPONSIVE.MARGIN_SMALL,
  },
  descriptionLabel: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.BODY_MEDIUM
      : isTablet()
      ? RESPONSIVE.BODY_LARGE
      : RESPONSIVE.BODY_MEDIUM,
    fontWeight: "bold",
    marginBottom: RESPONSIVE.MARGIN_XS,
    marginTop: RESPONSIVE.MARGIN_MEDIUM, // Adicionado para melhor espaçamento
  },
  description: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.BODY_MEDIUM
      : isTablet()
      ? RESPONSIVE.BODY_LARGE
      : RESPONSIVE.BODY_MEDIUM,
    lineHeight: isTablet() ? 28 : 24,
    color: "#343a40",
  },
});

/**
 * Seção de detalhes de um produto, contendo categoria, título, preço e descrição.
 * @param {string} category - Categoria do produto.
 * @param {string} title - Título/nome do produto.
 * @param {string} price - Preço formatado.
 * @param {string} description - Descrição completa.
 */
export default function ProductDetailsSection({
  category,
  title,
  price,
  description,
}) {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>

      <Text style={styles.descriptionLabel}>Descrição:</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
