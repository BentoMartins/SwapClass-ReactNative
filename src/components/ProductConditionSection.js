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
  conditionText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    marginTop: RESPONSIVE.MARGIN_XS,
  },
});

/**
 * Seção de condição do produto.
 * @param {string} condition - Condição do produto (ex: "Novo - Nunca Usado.").
 */
export default function ProductConditionSection({ condition }) {
  return (
    <View style={styles.container}>
      <SectionHeader title="Condição" />
      <Text style={styles.conditionText}>{condition}</Text>
    </View>
  );
}

