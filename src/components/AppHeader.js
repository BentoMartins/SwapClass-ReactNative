import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3C1342", // Cor de fundo do header
    paddingHorizontal: 20,
    paddingBottom: 15,
    minHeight: 60,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF007A", // Cor do título (ex: SwapClass)
    flex: 1,
  },
  headerTitleLeft: {
    textAlign: "left",
  },
  headerTitleCenter: {
    textAlign: "center",
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  backIcon: {
    width: 25,
    height: 22,
    tintColor: "#FFFFFF",
  },
  actionButton: {
    padding: 8,
    marginLeft: 10,
  },
  actionIcon: {
    width: 25,
    height: 22,
    tintColor: "#FFFFFF",
  },
});

/**
 * Header genérico do aplicativo com título e botões opcionais.
 * @param {string} title - O título principal do aplicativo.
 * @param {function} onBackPress - Função chamada ao pressionar o botão de voltar (opcional).
 * @param {function} onActionPress - Função chamada ao pressionar o botão de ação (opcional).
 * @param {number} actionIcon - URI/require da imagem do ícone de ação (ex: coração).
 */
export default function AppHeader({
  title,
  onBackPress,
  onActionPress,
  actionIcon,
}) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
      <View style={styles.headerContent}>
        {onBackPress && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Image
              source={require("../../assets/voltar-icon.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.headerTitle,
            onBackPress ? styles.headerTitleCenter : styles.headerTitleLeft,
          ]}
        >
          {title}
        </Text>
      </View>
      {onActionPress && actionIcon && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <Image source={actionIcon} style={styles.actionIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}
