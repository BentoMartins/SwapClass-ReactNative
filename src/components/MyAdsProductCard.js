import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    overflow: "hidden",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  priceBadge: {
    position: "absolute",
    bottom: RESPONSIVE.PADDING_SMALL,
    left: RESPONSIVE.PADDING_SMALL,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: RESPONSIVE.PADDING_XS,
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
  },
  priceText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "bold",
    color: "#000",
  },
});

/**
 * Card de produto para a tela "Meus anúncios" com badge de preço sobreposto.
 * @param {object} product - Objeto contendo { id, imageUri, price }.
 * @param {function} onPress - Função chamada ao clicar no card.
 */
export default function MyAdsProductCard({ product, onPress }) {
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
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

