import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const styles = StyleSheet.create({
  productCard: {
    width: 240, // Largura reduzida para scroll horizontal
    backgroundColor: "transparent", // Removido background branco
    borderWidth: 0, // Removida borda
    borderRadius: 12,
    padding: 0,
    marginRight: 15, // Espaçamento entre os cards no scroll horizontal
    alignItems: "stretch",
    position: "relative",
    overflow: "hidden",
  },
  productWrapper: {
    width: 240, // Largura reduzida para corresponder ao card
    marginRight: 15,
  },
  imageContainer: {
    width: "100%",
    height: 180, // Altura maior para 2 colunas
    position: "relative",
    borderRadius: 12, // Bordas arredondadas na imagem
    overflow: "hidden",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10, // Canto superior direito
    zIndex: 1,
    width: 36, // Tamanho fixo do círculo
    height: 36, // Tamanho fixo do círculo
    borderRadius: 18, // Círculo perfeito
    backgroundColor: "#000", // Fundo preto
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  favoriteIcon: {
    fontSize: 18,
    color: "#FF007A", // Rosa para contrastar com o fundo preto
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "left",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
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
    <View style={styles.productWrapper}>
      {/* Card da Imagem */}
      <TouchableOpacity
        style={styles.productCard}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Container da Imagem com Borda */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUri }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {/* Botão de Favoritar sobreposto na imagem */}
          <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
            <Text style={styles.favoriteIcon}>♡</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Informações do Produto (Título e Preço) - Abaixo do Card */}
      <View style={styles.productInfo}>
        {product.title && (
          <Text style={styles.productTitle} numberOfLines={2}>
            {product.title}
          </Text>
        )}
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </View>
  );
}
