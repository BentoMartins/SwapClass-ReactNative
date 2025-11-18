import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  baseText: {
    fontSize: 15, // Tamanho base
    fontWeight: "400",
    textAlign: "center",
  },
});

/**
 * Componente genérico para textos que funcionam como links de navegação.
 * @param {string} text - O texto a ser exibido.
 * @param {function} onPress - Função de callback ao pressionar.
 * @param {string} color - Cor do texto (padrão: '#007bff').
 * @param {boolean} isUnderlined - Se deve ter sublinhado (padrão: false).
 * @param {object} style - Estilos adicionais para o container/TouchableOpacity.
 * @param {object} textStyle - Estilos adicionais para o Text.
 */
export default function LinkText({
  text,
  onPress,
  color = "#007bff",
  isUnderlined = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text
        style={[
          styles.baseText,
          { color: color },
          isUnderlined ? { textDecorationLine: "underline" } : {},
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
