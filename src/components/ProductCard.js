import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const styles = StyleSheet.create({
  productCard: {
    width: "30%", // Mantido 30% para layout de 3 colunas
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: 12,
    padding: 8,
    marginBottom: 15,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 14,
    color: "#FF007A",
    fontWeight: "bold",
  },
  productImage: {
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 10,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});

/**
 * Card genérico para exibição de produtos em grades.
 * @param {object} product - Objeto contendo { id, imageUri, price, title }.
 * @param {function} onPress - Função chamada ao clicar no card.
 * @param {function} onFavoritePress - Função chamada ao clicar no ícone de favorito.
 */
export default function ProductCard({ product, onPress, onFavoritePress }) {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Botão de Favoritar */}
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
        <Text style={styles.favoriteIcon}>♥</Text>
      </TouchableOpacity>

      {/* Imagem */}
      <Image
        source={{ uri: product.imageUri }}
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Título (Adicionado para maior reuso, embora o original não use) */}
      {/* <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text> */}

      {/* Preço */}
      <Text style={styles.productPrice}>{product.price}</Text>
    </TouchableOpacity>
  );
}
