import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    alignItems: "center",
    marginBottom: RESPONSIVE.MARGIN_LARGE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: RESPONSIVE.BODY_LARGE,
    fontWeight: "900",
  },
});

/**
 * Botão genérico para ações principais, com suporte a estado de loading (ActivityIndicator).
 * @param {string} title - O texto do botão.
 * @param {function} onPress - Função de callback ao pressionar.
 * @param {boolean} isLoading - Se está carregando (mostra o ActivityIndicator).
 * @param {boolean} disabled - Se o botão está desabilitado.
 * @param {string} backgroundColor - Cor de fundo do botão.
 * @param {string} textColor - Cor do texto.
 */
export default function ActionButton({
  title,
  onPress,
  isLoading,
  disabled,
  backgroundColor,
  textColor,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        style,
        {
          backgroundColor: backgroundColor,
          opacity: disabled || isLoading ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
