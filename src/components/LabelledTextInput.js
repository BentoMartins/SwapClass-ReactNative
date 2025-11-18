import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
});

/**
 * Input de texto genérico com label.
 * @param {string} label - O texto do label.
 * @param {boolean} showLabel - Se o label deve ser exibido (default: true).
 * @param {object} labelStyle - Estilos adicionais para o label.
 * @param {object} style - Estilos adicionais para o input (TextInput).
 * @param {any} ...restProps - Props passadas para o TextInput.
 */
export default function LabelledTextInput({
  label,
  showLabel = true,
  labelStyle,
  style,
  ...restProps
}) {
  return (
    <View style={styles.inputContainer}>
      {showLabel && (
        <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>
      )}
      <TextInput
        style={[styles.textInput, style]}
        placeholderTextColor="#999"
        {...restProps}
      />
    </View>
  );
}
