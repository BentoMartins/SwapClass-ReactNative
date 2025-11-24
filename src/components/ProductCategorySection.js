import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive";
import SectionHeader from "./SectionHeader";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_MEDIUM,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  categoryText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    marginTop: RESPONSIVE.MARGIN_XS,
  },
});

/**
 * Seção de categoria do produto.
 * @param {string} category - Categoria do produto (ex: "Eletrônicos").
 */
export default function ProductCategorySection({ category }) {
  return (
    <View style={styles.container}>
      <SectionHeader title="Categoria" />
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );
}

