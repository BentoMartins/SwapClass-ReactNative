import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconNavItem from "./IconNavItem"; // Importa o componente filho

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#3C1342",
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 60,
  },
});

/**
 * Barra de navegação inferior que gerencia vários ícones de navegação.
 * @param {Array<{name: string, icon: number, activeIcon: number, navigateTo: string}>} items - Lista de itens de navegação.
 * @param {string} activeTab - O nome da aba ativa atualmente.
 * @param {function} setActiveTab - Função para atualizar a aba ativa.
 * @param {function} onNavigate - Função de navegação (ex: navigation.navigate).
 */
export default function BottomNavigationBar({
  items,
  activeTab,
  setActiveTab,
  onNavigate,
}) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.bottomNavigation, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {items.map((item) => (
        <IconNavItem
          key={item.name}
          item={item}
          isActive={activeTab === item.name}
          onPress={() => {
            setActiveTab(item.name);
            onNavigate(item.navigateTo);
          }}
        />
      ))}
    </View>
  );
}
