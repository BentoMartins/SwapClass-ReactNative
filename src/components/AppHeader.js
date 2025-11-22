import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

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
  headerTitleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF007A", // Cor do título (ex: SwapClass)
    textAlign: "center",
  },
  headerTitleLeft: {
    textAlign: "left",
  },
  headerTitleCenter: {
    textAlign: "center",
  },
  backButton: {
    padding: 12,
    marginRight: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF007A",
  },
  actionButton: {
    padding: 8,
    marginLeft: 10,
  },
  actionIcon: {
    width: 25,
    height: 22,
  },
});

/**
 * Header genérico do aplicativo com título e botões opcionais.
 * @param {string} title - O título principal do aplicativo.
 * @param {function} onBackPress - Função chamada ao pressionar o botão de voltar (opcional).
 * @param {function} onActionPress - Função chamada ao pressionar o botão de ação (opcional).
 * @param {number} actionIcon - URI/require da imagem do ícone de ação (ex: coração).
 * @param {boolean} showBackButton - Se false, oculta o botão de voltar mesmo que possa voltar (padrão: true).
 */
export default function AppHeader({
  title,
  onBackPress,
  onActionPress,
  actionIcon,
  showBackButton = true,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      // Se não houver callback customizado, usa a navegação padrão
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };
  
  const paddingTop = Math.max(insets.top, 10);
  
  const shouldShowBackButton = showBackButton && (onBackPress || navigation.canGoBack());
  
  return (
    <View style={[styles.header, { paddingTop }]}>
      <View style={styles.headerContent}>
        {shouldShowBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={require("../../assets/voltar-icon.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View 
        style={[styles.headerTitleContainer, { top: paddingTop, bottom: 15 }]}
        pointerEvents="none"
      >
        <Text style={styles.headerTitle}>
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
