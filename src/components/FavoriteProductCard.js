import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  card: {
    width: "48%", // 2 colunas com espaço entre
    backgroundColor: "#fff",
    borderRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    overflow: "hidden",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  favoriteIcon: {
    position: "absolute",
    top: RESPONSIVE.PADDING_SMALL,
    left: RESPONSIVE.PADDING_SMALL,
    zIndex: 2,
  },
  favoriteIconImage: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  discountBadge: {
    position: "absolute",
    top: RESPONSIVE.PADDING_SMALL,
    right: RESPONSIVE.PADDING_SMALL,
    backgroundColor: "#FF007A",
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: RESPONSIVE.PADDING_XS / 2,
    borderRadius: RESPONSIVE.BORDER_RADIUS_SMALL,
    transform: [{ rotate: "15deg" }],
  },
  discountText: {
    fontSize: RESPONSIVE.BODY_SMALL,
    fontWeight: "bold",
    color: "#fff",
  },
  priceBadge: {
    position: "absolute",
    bottom: RESPONSIVE.PADDING_SMALL,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_XS,
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  originalPrice: {
    fontSize: RESPONSIVE.BODY_SMALL,
    color: "#fff",
    textDecorationLine: "line-through",
    marginRight: RESPONSIVE.MARGIN_XS / 2,
  },
  finalPrice: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "bold",
    color: "#fff",
  },
  singlePrice: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "bold",
    color: "#fff",
  },
});

/**
 * Card de produto para a tela de favoritos com badge de preço e desconto.
 * @param {object} product - Objeto contendo { id, imageUri, price, originalPrice, discount }.
 * @param {function} onPress - Função chamada ao clicar no card.
 * @param {function} onFavoritePress - Função chamada ao clicar no ícone de favorito.
 */
export default function FavoriteProductCard({
  product,
  onPress,
  onFavoritePress,
}) {
  const hasDiscount = product.originalPrice && product.discount;

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

        {/* Ícone de favorito */}
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Image
            source={require("../../assets/coracao-icon.png")}
            style={styles.favoriteIconImage}
          />
        </TouchableOpacity>

        {/* Badge de desconto (se houver) */}
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}%</Text>
          </View>
        )}

        {/* Badge de preço */}
        <View style={styles.priceBadge}>
          {hasDiscount ? (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
              <Text style={styles.finalPrice}>{product.price}</Text>
            </View>
          ) : (
            <Text style={styles.singlePrice}>{product.price}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

