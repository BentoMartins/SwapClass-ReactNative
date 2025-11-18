import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  optionsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  plusIcon: {
    width: 15,
    height: 15,
    tintColor: "#FF007A",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
});

/**
 * Componente genérico para agrupar opções adicionais com ícones e divisores.
 * @param {Array<{text: string, icon: number}>} options - Lista de objetos de opção.
 * @param {function} onOptionPress - Função chamada ao pressionar uma opção.
 * @param {number} plusIcon - Ícone de ação (geralmente um sinal de mais).
 */
export default function OptionGroup({ options, onOptionPress, plusIcon }) {
  return (
    <View style={styles.optionsSection}>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => onOptionPress(option.text)}
          >
            <View style={styles.optionLeft}>
              <Image source={option.icon} style={styles.optionIcon} />
              <Text style={styles.optionText}>{option.text}</Text>
            </View>
            <Image source={plusIcon} style={styles.plusIcon} />
          </TouchableOpacity>
          {index < options.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
}
