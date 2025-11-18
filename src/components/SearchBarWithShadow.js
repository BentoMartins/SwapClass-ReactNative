import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    // Estilo de Borda e Sombra Customizado
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#000",
    borderBottomColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0, // Remove padding padrão do TextInput
  },
  searchButton: {
    padding: 5,
    marginLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});

/**
 * Barra de busca com estilo de borda de sombra customizado.
 * @param {string} placeholder - Texto placeholder do input.
 * @param {string} value - Valor atual do input.
 * @param {function} onChangeText - Função de callback para mudança de texto.
 * @param {function} onSearchPress - Função chamada ao pressionar o ícone de busca.
 * @param {number} searchIcon - URI/require da imagem do ícone de busca.
 * @param {string} searchIconColor - Cor do ícone de busca (tintColor).
 * @param {object} containerStyle - Estilos adicionais para o container.
 * @param {object} inputStyle - Estilos adicionais para o TextInput.
 */
export default function SearchBarWithShadow({
  placeholder,
  value,
  onChangeText,
  onSearchPress,
  searchIcon,
  searchIconColor = "#000",
  containerStyle,
  inputStyle,
  ...restProps
}) {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <TextInput
        style={[styles.searchInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        {...restProps}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
        <Image
          source={searchIcon}
          style={[styles.searchIcon, { tintColor: searchIconColor }]}
        />
      </TouchableOpacity>
    </View>
  );
}
