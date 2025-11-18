import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  baseButton: {
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    alignItems: "center",
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "800",
  },
});

/**
 * Botão genérico para ações principais de formulário, com estado ativo/inativo.
 * @param {string} title - O texto do botão.
 * @param {function} onPress - Função de callback ao pressionar.
 * @param {boolean} isActive - Se o botão está ativo (habilitado e com cor ativa).
 * @param {string} activeColor - Cor de fundo quando ativo.
 * @param {string} inactiveColor - Cor de fundo quando inativo/desabilitado.
 * @param {object} style - Estilos adicionais para o container.
 */
export default function ActionFormButton({
  title,
  onPress,
  isActive,
  activeColor,
  inactiveColor,
  style,
}) {
  const buttonColor = isActive ? activeColor : inactiveColor;

  return (
    <TouchableOpacity
      style={[styles.baseButton, style, { backgroundColor: buttonColor }]}
      onPress={onPress}
      disabled={!isActive}
      activeOpacity={isActive ? 0.8 : 1}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
