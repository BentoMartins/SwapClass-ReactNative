import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const styles = StyleSheet.create({
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
    width: 23,
    height: 21,
    marginRight: 15,
    tintColor: "#FF007A",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  arrowIcon: {
    width: 15,
    height: 10,
    tintColor: "#FF007A",
  },
});

/**
 * Item genérico de opção com ícone e texto para listas.
 */
export default function OptionItem({ text, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
      <View style={styles.optionLeft}>
        <Image source={icon} style={styles.optionIcon} resizeMode="contain" />
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <Image
        source={require("../../assets/flecha-icon.png")}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
