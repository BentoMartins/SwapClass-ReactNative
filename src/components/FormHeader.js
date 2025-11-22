import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 15,
    minHeight: 50,
  },
  backButton: {
    padding: 12,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF007A",
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    color: "#FF007A",
    fontSize: 18,
    fontWeight: "bold",
  },
});

/**
 * Cabeçalho genérico de formulário com botão de voltar e botão de ação textual.
 * @param {function} onBackPress - Função para o botão de voltar.
 * @param {function} onActionPress - Função para o botão de ação.
 * @param {string} actionText - Texto do botão de ação (ex: "Publicar").
 */
export default function FormHeader({ onBackPress, onActionPress, actionText }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Image
          source={require("../../assets/voltar-icon.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
        <Text style={styles.actionText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}
