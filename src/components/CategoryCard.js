import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  categoryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: 12,
    padding: 30,
    marginBottom: 12,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  // Decoração
  starIcon: {
    position: "absolute",
    zIndex: 2,
  },
  starPositionTopLeft: {
    width: 35,
    height: 35,
    top: 140,
    left: 142,
  },
  starPositionBottomRight: {
    width: 32,
    height: 32,
    bottom: 140,
    right: 145,
  },
  starPositionBottomLeft: {
    width: 35,
    height: 35,
    bottom: -15,
    left: -15,
  },
  // Note: O estilo original tinha 'top: 142, left: 142' que parecia fora de contexto para o card
  // Ajustei as posições para serem relativas aos cantos do card.
});

/**
 * Mapeamento de posições de estrela para estilos
 */
const starPositionStyles = {
  "top-left": styles.starPositionTopLeft,
  "bottom-right": styles.starPositionBottomRight,
  "bottom-left": styles.starPositionBottomLeft,
};

/**
 * Card genérico para exibição de uma categoria com ícone de decoração opcional.
 * @param {object} category - Objeto contendo { name, icon, starIcon (opcional), starPosition (opcional)}.
 * @param {function} onPress - Função chamada ao clicar no card.
 */
export default function CategoryCard({ category, onPress }) {
  const isSelected = category.isSelected; // Mantido para caso de uso futuro de filtro

  return (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        isSelected && { borderColor: "#007bff", borderWidth: 3 }, // Estilo para selecionado
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Ícone de Decoração (Estrela/Emoji) */}
      {category.starIcon && (
        <Image
          source={category.starIcon}
          style={[
            styles.starIcon,
            starPositionStyles[category.starPosition] ||
              styles.starPositionTopLeft, // Posição default
          ]}
          resizeMode="contain"
        />
      )}

      {/* Imagem principal da categoria */}
      <Image
        source={category.icon}
        style={styles.categoryImage}
        resizeMode="contain"
      />

      {/* Nome da categoria */}
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
}
