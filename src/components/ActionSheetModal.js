import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "50%",
    minHeight: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  closeButton: {
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  closeIcon: {
    width: 17,
    height: 17,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    marginLeft: -17, // Ajuste para centralizar o texto
  },
  itemList: {
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});

/**
 * Modal deslizante genérico (Action Sheet) para seleção de listas.
 * @param {boolean} isVisible - Se o modal deve estar visível.
 * @param {function} onClose - Função para fechar o modal.
 * @param {string} title - Título do modal.
 * @param {Array<string>} items - Array de strings para os itens da lista.
 * @param {function} onItemSelected - Função chamada ao selecionar um item.
 * @param {Animated.Value} slideAnim - Referência ao valor animado (ref) para controle.
 */
export default function ActionSheetModal({
  isVisible,
  onClose,
  title,
  items,
  onItemSelected,
  slideAnim, // Recebe a ref do Animated.Value do componente pai
}) {
  // Lógica de Animação (Extraída da tela original)
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image
                source={require("../../assets/x-icon.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>

          <ScrollView style={styles.itemList}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => onItemSelected(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
