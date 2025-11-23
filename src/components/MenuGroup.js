import React from "react";
import { View, StyleSheet } from "react-native";
import MenuItem from "./MenuItem";

const styles = StyleSheet.create({
  menuGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 55, // Alinha com o texto após o ícone
  },
});

/**
 * Grupo de itens de menu estilo Instagram.
 */
export default function MenuGroup({ items, onItemPress }) {
  return (
    <View style={styles.menuGroup}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <MenuItem
            text={item.text}
            icon={item.icon}
            onPress={() => onItemPress(item.route)}
          />
          {index < items.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
}

