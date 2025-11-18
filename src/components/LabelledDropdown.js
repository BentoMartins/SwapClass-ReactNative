import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

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
  dropdownInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    minHeight: 50, // Adicionado para consistência visual
  },
  dropdownText: {
    fontSize: 16,
    color: "#666",
  },
  dropdownTextValue: {
    color: "#000",
    fontWeight: "500",
  },
  dropdownIcon: {
    width: 15,
    height: 10,
  },
});

/**
 * Componente genérico para simular um dropdown (exibindo o valor selecionado e abrindo um modal).
 * @param {string} label - O texto do label.
 * @param {string} value - O valor selecionado.
 * @param {string} placeholder - Texto placeholder.
 * @param {function} onPress - Função chamada ao tocar.
 * @param {number} icon - Ícone (ex: seta).
 * @param {string} iconColor - Cor do ícone (tintColor).
 */
export default function LabelledDropdown({
  label,
  value,
  placeholder,
  onPress,
  icon,
  iconColor,
}) {
  const displayValue = value || placeholder;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdownInput} onPress={onPress}>
        <Text
          style={[styles.dropdownText, value ? styles.dropdownTextValue : null]}
          numberOfLines={1}
        >
          {displayValue}
        </Text>
        <Image
          source={icon}
          style={[styles.dropdownIcon, { tintColor: iconColor }]}
        />
      </TouchableOpacity>
    </View>
  );
}
