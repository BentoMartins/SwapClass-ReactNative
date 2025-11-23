import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    tintColor: "#FF007A",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "#FF007A",
  },
});

export default function MenuItem({ text, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuLeft}>
        {icon && <Image source={icon} style={styles.menuIcon} resizeMode="contain" />}
        <Text style={styles.menuText}>{text}</Text>
      </View>
      <Image
        source={require("../../assets/flecha-icon.png")}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

