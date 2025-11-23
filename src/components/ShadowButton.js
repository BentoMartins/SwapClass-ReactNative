import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  baseButton: {
    // Estilo Visual Único (Shadow/Border Style)
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT * 0.8,
    justifyContent: "center",
  },
  baseText: {
    fontSize: RESPONSIVE.BODY_SMALL || 12, // Tamanho menor
    fontWeight: "600",
    textAlign: "center",
  },
});

/**
 * Botão genérico com estilo de borda de sombra customizado,
 * permitindo cores de fundo e texto flexíveis.
 * * @param {string} title - Texto do botão.
 * @param {function} onPress - Função de callback.
 * @param {string} backgroundColor - Cor de fundo (Obrigatório).
 * @param {string} textColor - Cor do texto (Padrão: '#fff').
 * @param {object} style - Estilos adicionais para o container.
 */
export default function ShadowButton({
  title,
  onPress,
  backgroundColor,
  textColor = "#fff",
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={[styles.baseButton, { backgroundColor: backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.baseText, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
