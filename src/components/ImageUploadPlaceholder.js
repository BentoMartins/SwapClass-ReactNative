import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  uploadIcon: {
    width: 38,
    height: 35,
    tintColor: "#FF007A",
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "500",
  },
  starIcon: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 80,
    height: 73,
    zIndex: 2,
  },
  tapeIcon: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 75,
    height: 75,
    zIndex: 2,
  },
  uploadHint: {
    fontSize: 16,
    marginTop: 10,
    color: "#8C8C8C",
    textAlign: "center",
  },
});

/**
 * Placeholder genérico para a área de upload de imagem com decorações.
 * @param {number} maxPhotos - Número máximo de fotos.
 * @param {number} uploadIcon - Ícone de upload.
 * @param {number} starIcon - Ícone de decoração (estrela).
 * @param {number} tapeIcon - Ícone de decoração (fita).
 */
export default function ImageUploadPlaceholder({
  maxPhotos,
  uploadIcon,
  starIcon,
  tapeIcon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Image source={uploadIcon} style={styles.uploadIcon} />
        <Text style={styles.uploadText}>Adicionar fotos</Text>

        <Image source={starIcon} style={styles.starIcon} />
        <Image source={tapeIcon} style={styles.tapeIcon} />
      </View>
      <Text style={styles.uploadHint}>
        Máximo de {maxPhotos} fotos. Escolha as suas melhores!
      </Text>
    </View>
  );
}
