import React from "react";
import { View, StyleSheet } from "react-native";
import OptionItem from "./OptionItem";

const styles = StyleSheet.create({
  optionsCard: {
    // ESTILO DE BORDA DE SOMBRA
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
});

/**
 * Card genérico para agrupar opções de navegação com separadores.
 * @param {Array<{text: string, icon: number, route: string}>} options - Lista de opções.
 * @param {function} onOptionPress - Função de callback que recebe a 'route' ao pressionar um item.
 */
export default function OptionGroupCard({ options, onOptionPress }) {
  return (
    <View style={styles.optionsCard}>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <OptionItem
            text={option.text}
            icon={option.icon}
            onPress={() => onOptionPress(option.route)} // Passa a rota para a função do componente pai
          />
          {index < options.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
}
