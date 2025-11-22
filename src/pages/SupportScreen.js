import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";

// Componentes
import AppHeader from "../components/AppHeader";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingTop: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_LARGE,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    marginTop: RESPONSIVE.MARGIN_SMALL,
  },
  contentText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
  },
});

export default function SupportScreen({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header com botão de voltar */}
      <AppHeader title="SwapClass" onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Título da seção */}
        <Text style={styles.sectionTitle}>Contate o suporte</Text>

        {/* Conteúdo */}
        <Text style={styles.contentText}>
          Entre em contato conosco através dos seguintes canais:
        </Text>

        <Text style={styles.contentText}>
          📧 Email: suporte@swapclass.com
        </Text>

        <Text style={styles.contentText}>
          💬 WhatsApp: (00) 00000-0000
        </Text>

        <Text style={styles.contentText}>
          Estamos disponíveis para ajudá-lo de segunda a sexta, das 9h às 18h.
        </Text>
      </ScrollView>
    </View>
  );
}

