import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive"; // Presumindo que o caminho é correto

// Cores definidas na tela original
const COLORS = {
  primary: {
    background: "#3C1342",
    text: "#fff",
  },
  secondary: {
    background: "#FF007A",
    text: "#fff",
  },
};

const styles = StyleSheet.create({
  baseButton: {
    flex: 1,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: "center",
  },
  baseText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "bold",
    textAlign: "center",
  },
});

/**
 * Botão genérico com estilo customizado (borda de sombra).
 * @param {string} title - Texto do botão.
 * @param {function} onPress - Função de callback ao pressionar.
 * @param {('primary'|'secondary')} variant - Variação de estilo de cor.
 * @param {object} style - Estilos adicionais para o container.
 */
export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  style,
}) {
  const colorScheme = COLORS[variant] || COLORS.primary;

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        { backgroundColor: colorScheme.background },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.baseText, { color: colorScheme.text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
