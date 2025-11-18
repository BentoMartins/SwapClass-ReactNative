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
  mapImage: {
    width: "100%",
    height: isTablet() ? 250 : isSmallScreen() ? 180 : 200,
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    marginTop: RESPONSIVE.MARGIN_SMALL,
    backgroundColor: "#f0f0f0",
  },
  locationText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#000",
    marginTop: RESPONSIVE.MARGIN_XS,
  },
});

/**
 * Seção de localização com mapa.
 * @param {string|number} mapImageUri - URI ou require da imagem do mapa.
 * @param {string} location - Texto da localização (ex: "Passo Fundo - RS").
 */
export default function LocationSection({ mapImageUri, location }) {
  return (
    <View style={styles.container}>
      <SectionHeader title="Bora marcar?" />
      {mapImageUri && (
        <Image
          source={
            typeof mapImageUri === "string"
              ? { uri: mapImageUri }
              : mapImageUri
          }
          style={styles.mapImage}
          resizeMode="cover"
        />
      )}
      {location && <Text style={styles.locationText}>{location}</Text>}
    </View>
  );
}

