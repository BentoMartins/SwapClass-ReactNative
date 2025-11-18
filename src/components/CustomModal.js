import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF8DC", // Cor creme
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "#000",
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    padding: 30,
    margin: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowRadius: 6,
    elevation: 6,
    position: "relative",
  },
  starDecoration: {
    position: "absolute",
    top: -45,
    right: -50,
    width: 110,
    height: 110,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#000",
    marginBottom: -15,
    textAlign: "center",
  },
  envelopeContainer: {
    marginBottom: 20,
  },
  centralImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  modalMessage: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
    marginTop: -30,
    marginBottom: 25,
  },
  modalButton: {
    paddingHorizontal: 110,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});

/**
 * Modal genérico com estilo customizado de borda/sombra e elementos de imagem.
 * @param {boolean} isVisible - Se o modal deve estar visível.
 * @param {function} onClose - Função para fechar o modal.
 * @param {string} title - Título do modal.
 * @param {string} message - Mensagem principal.
 * @param {number} decorationImage - Imagem de decoração (estrela).
 * @param {number} centralImage - Imagem central (carta/envelope).
 * @param {string} buttonText - Texto do botão de ação.
 * @param {string} buttonColor - Cor de fundo do botão de ação.
 */
export default function CustomModal({
  isVisible,
  onClose,
  title,
  message,
  decorationImage,
  centralImage,
  buttonText,
  buttonColor,
}) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Decoração Estrela */}
          <Image
            source={decorationImage}
            style={styles.starDecoration}
            resizeMode="contain"
          />

          <Text style={styles.modalTitle}>{title}</Text>

          {/* Ilustração Central */}
          <View style={styles.envelopeContainer}>
            <Image
              source={centralImage}
              style={styles.centralImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.modalMessage}>{message}</Text>

          {/* Botão OK */}
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: buttonColor }]}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
