import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  label: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "650",
    color: "#000",
    marginBottom: 2,
    paddingHorizontal: 8,
  },
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
    fontSize: 14,
    minHeight: RESPONSIVE.INPUT_HEIGHT,
    textAlignVertical: "center",
    color: "#000", // Adiciona a cor do texto para garantir contraste
  },
});

/**
 * Componente genérico para campo de formulário com label e estilo customizado de input.
 * Aceita todas as props nativas do TextInput.
 * @param {string} label - O texto do label acima do input.
 * @param {object} containerStyle - Estilos para o container principal.
 * @param {object} labelStyle - Estilos para o label.
 * @param {string} placeholderTextColor - Cor do placeholder.
 * @param {any} ...restProps - Todas as outras props passadas para o TextInput.
 */
export default function FormField({
  label,
  containerStyle,
  labelStyle,
  placeholderTextColor = "#999",
  ...restProps
}) {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor={placeholderTextColor}
        {...restProps}
      />
    </View>
  );
}
