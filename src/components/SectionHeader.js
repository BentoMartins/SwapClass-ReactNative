import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  sectionEmojis: {
    fontSize: 16,
  },
});

/**
 * Header genérico para seções de conteúdo em telas (ex: listagens de produtos).
 * @param {string} title - O título da seção (ex: Do seu interesse).
 * @param {string} emojis - Texto ou emojis decorativos (opcional).
 */
export default function SectionHeader({ title, emojis }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {emojis && <Text style={styles.sectionEmojis}>{emojis}</Text>}
    </View>
  );
}
