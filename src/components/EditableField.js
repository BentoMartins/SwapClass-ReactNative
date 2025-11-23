import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  fieldRow: {
    width: "100%",
  },
  textInput: {
    width: "100%",
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
  maskedInput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#000",
  },
  changeButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    marginTop: 8,
  },
  changeButtonText: {
    color: "#FF007A",
    fontSize: 14,
    fontWeight: "600",
  },
});

/**
 * Campo editável com botão "Alterar" e modo de visualização mascarado.
 * @param {string} label - O texto do label.
 * @param {string} value - O valor atual do campo.
 * @param {function} onChangeText - Função chamada ao alterar o texto.
 * @param {function} onMaskValue - Função para mascarar o valor (ex: para senhas, emails).
 * @param {boolean} isEditing - Se o campo está em modo de edição.
 * @param {function} onEditPress - Função chamada ao pressionar "Alterar".
 * @param {object} inputProps - Props adicionais para o TextInput.
 */
export default function EditableField({
  label,
  value,
  onChangeText,
  onMaskValue,
  isEditing = false,
  onEditPress,
  ...inputProps
}) {
  const displayValue = isEditing ? value : (onMaskValue ? onMaskValue(value) : value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldRow}>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#999"
            {...inputProps}
          />
        ) : (
          <View style={styles.maskedInput}>
            <Text style={{ fontSize: 16, color: "#000" }}>{displayValue || ""}</Text>
          </View>
        )}
        {!isEditing && (
          <TouchableOpacity style={styles.changeButton} onPress={onEditPress}>
            <Text style={styles.changeButtonText}>Alterar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

