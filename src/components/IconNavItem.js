import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navItem: {
    padding: 4,
  },
  navIcon: {
    width: 27,
    height: 26,
    tintColor: "#FFFFFF", // Cor padrão (Inativo)
  },
  navIconActive: {
    width: 27, // Mantido o mesmo tamanho do ícone inativo
    height: 26,
    // Não aplica tintColor quando há activeIcon, para manter a cor original do ícone
  },
});

/**
 * Item individual de navegação para a barra inferior.
 * @param {object} item - Objeto de item de navegação.
 * @param {boolean} isActive - Se o item está ativo.
 * @param {function} onPress - Função chamada ao pressionar.
 */
export default function IconNavItem({ item, isActive, onPress }) {
  // Escolhe a fonte do ícone: 'activeIcon' se ativo e existir, senão 'icon'
  const iconSource = isActive && item.activeIcon ? item.activeIcon : item.icon;

  // O estilo 'activeIcon' da tela original só muda a cor,
  // mantendo o tamanho e aplicando a cor 'FF007A' no tintColor.
  const iconStyle = isActive ? styles.navIconActive : styles.navIcon;

  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Image source={iconSource} style={iconStyle} />
    </TouchableOpacity>
  );
}
