import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RESPONSIVE, isSmallScreen, isTablet } from "../utils/responsive";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingTop: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_SMALL,
  },
  title: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.SUBTITLE
      : isTablet()
      ? RESPONSIVE.TITLE_SMALL
      : RESPONSIVE.SUBTITLE * 1.1,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_XS,
    lineHeight: isTablet() ? 32 : 28,
  },
  price: {
    fontSize: isSmallScreen()
      ? RESPONSIVE.TITLE_SMALL
      : isTablet()
      ? RESPONSIVE.TITLE_MEDIUM
      : RESPONSIVE.TITLE_SMALL,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_XS,
  },
  metadata: {
    fontSize: RESPONSIVE.BODY_SMALL,
    color: "#666",
    marginBottom: RESPONSIVE.MARGIN_SMALL,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RESPONSIVE.MARGIN_SMALL,
  },
  locationIconContainer: {
    marginRight: RESPONSIVE.MARGIN_XS / 2,
  },
  locationIconText: {
    fontSize: 16,
  },
  locationText: {
    fontSize: RESPONSIVE.BODY_SMALL,
    color: "#000",
  },
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
  },
  sellerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: RESPONSIVE.MARGIN_XS,
    backgroundColor: "#f0f0f0",
  },
  sellerText: {
    fontSize: RESPONSIVE.BODY_SMALL,
    color: "#000",
  },
  messageButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    borderRadius: RESPONSIVE.BORDER_RADIUS_LARGE,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: RESPONSIVE.MARGIN_SMALL,
  },
  messageButtonText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
    marginLeft: RESPONSIVE.MARGIN_XS,
    flexShrink: 0,
  },
  whatsappIcon: {
    width: 18,
    height: 18,
    tintColor: "#666",
  },
});

/**
 * Seção de informações principais do produto.
 * @param {string} title - Título do produto.
 * @param {string} price - Preço formatado.
 * @param {string} listedTime - Tempo desde que foi listado (ex: "Listado à 3 horas").
 * @param {string} distance - Distância do produto (ex: "Perto - 4 km").
 * @param {string} sellerName - Nome do vendedor.
 * @param {string|number} sellerAvatar - URI ou require da foto do vendedor.
 * @param {function} onMessagePress - Função chamada ao pressionar o botão de mensagem.
 */
export default function ProductInfoSection({
  title,
  price,
  listedTime,
  distance,
  sellerName,
  sellerAvatar,
  onMessagePress,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      {listedTime && <Text style={styles.metadata}>{listedTime}</Text>}
      
      {distance && (
        <View style={styles.locationRow}>
          <View style={styles.locationIconContainer}>
            <Text style={styles.locationIconText}>📍</Text>
          </View>
          <Text style={styles.locationText}>{distance}</Text>
        </View>
      )}

      {sellerName && (
        <View style={styles.sellerRow}>
          {sellerAvatar && (
            <Image
              source={
                typeof sellerAvatar === "string"
                  ? { uri: sellerAvatar }
                  : sellerAvatar
              }
              style={styles.sellerAvatar}
            />
          )}
          <Text style={styles.sellerText}>Vendido por {sellerName}</Text>
        </View>
      )}

      {onMessagePress && (
        <TouchableOpacity style={styles.messageButton} onPress={onMessagePress}>
          <Image
            source={require("../../assets/whatsapp-icon.png")}
            style={styles.whatsappIcon}
          />
          <Text style={styles.messageButtonText} numberOfLines={1}>
            Mandar mensagem para o vendedor!
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

