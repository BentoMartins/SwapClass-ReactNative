import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  card: {
    width: "80%", // 2 colunas com espaço entre
    backgroundColor: "#fff",
    borderRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    overflow: "hidden",
    position: "relative",
  },
  imageContainer: {
    width: "90%",
    height: 180,
    position: "relative",
    borderTopLeftRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    borderTopRightRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    borderBottomLeftRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    borderBottomRightRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  productInfo: {
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: RESPONSIVE.PADDING_XS,
    width: "100%",
    borderBottomLeftRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    borderBottomRightRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    backgroundColor: "#fff",
  },
  productTitle: {
    fontSize: RESPONSIVE.BODY_SMALL,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  priceText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "bold",
    color: "#000",
  },
});

/**
 * Card de produto para a tela de favoritos com informações abaixo da imagem.
 * @param {object} product - Objeto contendo { id, imageUri, price, title }.
 * @param {function} onPress - Função chamada ao clicar no card.
 * @param {function} onFavoritePress - Função chamada ao clicar no ícone de favorito.
 */
export default function FavoriteProductCard({
  product,
  onPress,
  onFavoritePress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUri }}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Botão de Favoritar no canto superior direito */}
        <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* Informações do produto abaixo da imagem */}
      <View style={styles.productInfo}>
        {product.title && (
          <Text style={styles.productTitle} numberOfLines={2}>
            {product.title}
          </Text>
        )}
        <Text style={styles.priceText}>{product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

