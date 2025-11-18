import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";

// Componentes Genéricos
import ProfileHeader from "../components/ProfileHeader";
import UserCard from "../components/UserCard";
import OptionGroupCard from "../components/OptionGroupCard";
import BottomNavigationBar from "../components/BottomNavigationBar";
import ShadowButton from "../components/ShadowButton"; // ⬅️ Reutilizando o componente existente!

// ... (Dados Estáticos: accountOptions, serviceOptions, navItems)

const accountOptions = [
  {
    text: "Editar meus dados",
    icon: require("../../assets/meusDados-icon.png"),
    route: "EditData",
  },
  {
    text: "Meus favoritos",
    icon: require("../../assets/coracao-icon.png"),
    route: "Favorites",
  },
  {
    text: "Meus anúncios",
    icon: require("../../assets/meusAnuncios-icon.png"),
    route: "MyAds",
  },
];

const serviceOptions = [
  {
    text: "Contate o suporte",
    icon: require("../../assets/suporte-icon.png"),
    route: "Support",
  },
  {
    text: "Perguntas frequentes",
    icon: require("../../assets/livros-icon.png"), // Usando ícone de livros como placeholder
    route: "FAQ",
  },
];

const navItems = [
  {
    name: "home",
    icon: require("../../assets/casa-icon.png"),
    activeIcon: require("../../assets/casaPreenchida-icon.png"),
    navigateTo: "Home",
  },
  {
    name: "search",
    icon: require("../../assets/lupa-icon.png"),
    activeIcon: require("../../assets/lupaPreenchida-icon.png"),
    navigateTo: "Category",
  },
  {
    name: "add",
    icon: require("../../assets/publicar-icon.png"),
    navigateTo: "Sell",
  },
  {
    name: "profile",
    icon: require("../../assets/conta-icon.png"),
    activeIcon: require("../../assets/contaPreenchida-icon.png"),
    navigateTo: "UserProfile",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    marginTop: 20,
  },
});

export default function UserProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState("profile");

  const handleLogout = () => {
    navigation.navigate("Welcome");
  };

  const handleOptionPress = (route) => {
    if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      <ProfileHeader />

      <UserCard
        userName="NOME DO USUÁRIO"
        userEmail="E-mail do usuário"
        avatarIcon={require("../../assets/user-icon.png")}
        decorativeIcon={require("../../assets/estrelaRosa-icon.png")}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Minha conta</Text>
        <OptionGroupCard
          options={accountOptions}
          onOptionPress={handleOptionPress}
        />

        <Text style={styles.sectionTitle}>Serviços</Text>
        <OptionGroupCard
          options={serviceOptions}
          onOptionPress={handleOptionPress}
        />

        <ShadowButton
          title="SAIR DA CONTA"
          onPress={handleLogout}
          backgroundColor="#FF0000" // Cor de alerta
          textColor="#FFFFFF"
          style={{ marginTop: 50, marginBottom: 40 }}
        />
      </ScrollView>

      <BottomNavigationBar
        items={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigate={navigation.navigate}
      />
    </View>
  );
}
