import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RESPONSIVE, isSmallScreen, isTablet } from "../utils/responsive";
import SectionHeader from "./SectionHeader";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_MEDIUM,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  universityImage: {
    width: "100%",
    height: isTablet() ? 200 : isSmallScreen() ? 150 : 180,
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    marginTop: RESPONSIVE.MARGIN_SMALL,
    backgroundColor: "#f0f0f0",
  },
  universityText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    marginTop: RESPONSIVE.MARGIN_XS,
  },
});

/**
 * Seção de universidade.
 * @param {string|number} universityImageUri - URI ou require da imagem da universidade.
 * @param {string} universityName - Nome da universidade (ex: "UPF - Universidade de Passo Fundo").
 */
export default function UniversitySection({
  universityImageUri,
  universityName,
}) {
  return (
    <View style={styles.container}>
      <SectionHeader title="Universidade" />
      {universityImageUri && (
        <Image
          source={
            typeof universityImageUri === "string"
              ? { uri: universityImageUri }
              : universityImageUri
          }
          style={styles.universityImage}
          resizeMode="cover"
        />
      )}
      {universityName && (
        <Text style={styles.universityText}>{universityName}</Text>
      )}
    </View>
  );
}

