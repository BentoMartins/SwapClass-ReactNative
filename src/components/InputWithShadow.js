import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: 20,
    marginBottom: 8, // Margem padrão entre inputs
    fontSize: 14,
    minHeight: RESPONSIVE.INPUT_HEIGHT,
    textAlignVertical: "center",
    color: "#000",
  },
});

/**
 * TextInput genérico com o estilo customizado de borda e sombra.
 * Aceita todas as props nativas do TextInput.
 * @param {string} placeholderTextColor - Cor do placeholder.
 * @param {object} style - Estilos adicionais para o TextInput.
 * @param {any} ...restProps - Todas as outras props passadas para o TextInput.
 */
export default function InputWithShadow({
  placeholderTextColor = "#999",
  style,
  ...restProps
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={placeholderTextColor}
      {...restProps}
    />
  );
}
