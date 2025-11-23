import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";

// Componentes
import AppHeader from "../components/AppHeader";
import MenuGroup from "../components/MenuGroup";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  contentContainer: {
    paddingHorizontal: RESPONSIVE.PADDING_LARGE,
    paddingVertical: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
  },
  photoSection: {
    marginTop: 40,
    marginBottom: RESPONSIVE.MARGIN_LARGE,
    alignItems: "center",
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RESPONSIVE.MARGIN_SMALL,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoPlaceholderIcon: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
  changePhotoButton: {
    paddingVertical: RESPONSIVE.PADDING_XS,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
  },
  changePhotoText: {
    fontSize: RESPONSIVE.BODY_SMALL,
    color: "#FF007A",
    fontWeight: "600",
  },
  menuContainer: {
    marginTop: 20,
  },
});

// Opções do menu
const menuOptions = [
  {
    text: "Detalhes pessoais",
    icon: require("../../assets/usuario-icon.png"),
    route: "PersonalDetails",
  },
  {
    text: "Números de telefone",
    icon: require("../../assets/telefone-icon.png"),
    route: "PhoneNumbers",
  },
  {
    text: "Senhas e segurança",
    icon: require("../../assets/cadeado-icon.png"),
    route: "PasswordSecurity",
  },
];

export default function EditDataScreen({ navigation }) {
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePhotoChange = () => {
    // TODO: Implementar seleção de imagem da galeria/câmera
    Alert.alert(
      "Alterar foto",
      "Escolha uma opção",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Câmera", onPress: () => console.log("Abrir câmera") },
        { text: "Galeria", onPress: () => console.log("Abrir galeria") },
      ],
      { cancelable: true }
    );
  };

  const handleMenuPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header padrão do SwapClass */}
      <AppHeader
        title="SwapClass"
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Foto de Perfil */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={handlePhotoChange}
            activeOpacity={0.8}
          >
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.photoImage} />
            ) : (
              <Image
                source={require("../../assets/usuarioCircular-icon.png")}
                style={styles.photoPlaceholderIcon}
                tintColor={null}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handlePhotoChange}
          >
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Menu de Opções */}
        <View style={styles.menuContainer}>
          <MenuGroup items={menuOptions} onItemPress={handleMenuPress} />
        </View>
      </ScrollView>
    </View>
  );
}
