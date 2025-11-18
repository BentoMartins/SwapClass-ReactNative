import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
});

/**
 * Título principal para telas de autenticação.
 * @param {string} title - O texto do título.
 */
export default function AuthTitle({ title }) {
  return <Text style={styles.title}>{title}</Text>;
}
