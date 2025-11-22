import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_SMALL,
    backgroundColor: "#fff",
    minHeight: 50,
  },
  iconButton: {
    padding: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#FF007A",
  },
});

/**
 * Header da tela de detalhes do produto com botões de voltar e favoritar.
 * @param {function} onBackPress - Função chamada ao pressionar o botão de voltar.
 * @param {function} onFavoritePress - Função chamada ao pressionar o botão de favoritar.
 * @param {boolean} isFavorite - Indica se o produto está favoritado.
 */
export default function ProductDetailHeader({
  onBackPress,
  onFavoritePress,
  isFavorite = false,
}) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
      <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
        <Image
          source={require("../../assets/voltar-icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onFavoritePress}>
        <Image
          source={require("../../assets/coracao-icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

