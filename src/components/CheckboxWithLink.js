import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RESPONSIVE } from "../utils/responsive";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -10,
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: RESPONSIVE.MARGIN_MEDIUM,
    height: RESPONSIVE.MARGIN_MEDIUM,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 3,
    marginRight: RESPONSIVE.MARGIN_XS,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  checkboxChecked: {
    backgroundColor: "#FF007A",
  },
  checkmark: {
    color: "#fff",
    fontSize: RESPONSIVE.CAPTION,
    fontWeight: "900",
  },
  termsText: {
    flex: 1,
    fontSize: 11,
    color: "#303030",
    fontWeight: "400",
    lineHeight: 16,
    marginTop: -16,
  },
  termsLink: {
    color: "#303030",
    textDecorationLine: "underline",
  },
});

/**
 * Componente de Checkbox integrado com um texto de termos e um link clicável.
 * @param {boolean} isChecked - Estado atual do checkbox.
 * @param {function} onToggle - Função chamada para mudar o estado do checkbox.
 * @param {string} termsText - O texto completo que acompanha o checkbox.
 * @param {string} linkText - O texto que será clicável/link.
 * @param {function} onLinkPress - Função chamada ao clicar no link.
 */
export default function CheckboxWithLink({
  isChecked,
  onToggle,
  termsText,
  linkText,
  onLinkPress,
}) {
  // Função para renderizar o texto com o link clicável
  const renderTermsText = () => {
    const parts = termsText.split(linkText);

    return (
      <Text style={styles.termsText}>
        {parts[0]}
        <Text style={styles.termsLink} onPress={onLinkPress}>
          {linkText}
        </Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Container do Checkbox (clica em qualquer lugar da linha para o checkbox) */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* Texto dos Termos */}
      {renderTermsText()}
    </View>
  );
}
