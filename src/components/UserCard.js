import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  userCard: {
    // POSICIONAMENTO FLUTUANTE
    position: "absolute",
    top: 70,
    left: 20,
    right: 20,
    zIndex: 10,

    // ESTILO DE BORDA DE SOMBRA
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  decorativeElement: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 50,
    height: 30,
    backgroundColor: "#FF007A", // Cor Rosa
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeIcon: {
    width: 25,
    height: 25,
    tintColor: "#FFFFFF",
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100, // Circular
    // Estilo de borda de sombra para o avatar
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: "#FF007A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
    marginRight: 15,
  },
  avatarIcon: {
    width: 35,
    height: 35,
    tintColor: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 1,
  },
  userEmail: {
    fontSize: 14,
    color: "#666666",
  },
});

/**
 * Card flutuante de perfil com avatar, info e elemento decorativo.
 */
export default function UserCard({
  userName,
  userEmail,
  avatarIcon,
  decorativeIcon,
}) {
  return (
    <View style={styles.userCard}>
      {/* Elemento Decorativo */}
      <View style={styles.decorativeElement}>
        <Image source={decorativeIcon} style={styles.decorativeIcon} />
      </View>

      <View style={styles.userContent}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Image
            source={avatarIcon}
            style={styles.avatarIcon}
            resizeMode="contain"
          />
        </View>

        {/* Informações */}
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {userEmail}
          </Text>
        </View>
      </View>
    </View>
  );
}
