import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3C1342", // Cor principal do tema (Roxo)
    height: 140,
  },
});

/**
 * Header genérico de cor sólida para telas de perfil.
 */
export default function ProfileHeader() {
  return <View style={styles.header} />;
}
