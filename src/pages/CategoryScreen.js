import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

// Componentes Genéricos Reutilizados
import AppHeader from "../components/AppHeader";
import BottomNavigationBar from "../components/BottomNavigationBar";
// Novos Componentes
import SearchBarWithShadow from "../components/SearchBarWithShadow";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { navigateToFavorites } from "../utils/navigationHelpers";
import { RESPONSIVE } from "../utils/responsive";

// Dados Estáticos de Categorias (Mantidos na tela para gerenciamento local)
const categoriesData = [
  {
    id: 1,
    name: "Móveis",
    icon: require("../../assets/cadeira-icon.png"),
    starIcon: require("../../assets/icon2-category.png"),
    starPosition: "bottom-right",
  },
  {
    id: 2,
    name: "Eletrônicos",
    icon: require("../../assets/computador-icon.png"),
  },
  { id: 3, name: "Roupas", icon: require("../../assets/camisa-icon.png") },
  {
    id: 4,
    name: "Tênis",
    icon: require("../../assets/tenis-icon.png"),
    starIcon: require("../../assets/icon1-category.png"),
    starPosition: "top-left",
  },
  {
    id: 5,
    name: "Livros",
    icon: require("../../assets/livros-icon.png"),
    starIcon: require("../../assets/icon3-category.png"),
    starPosition: "bottom-left",
  },
  { id: 6, name: "Outros", icon: require("../../assets/lampada-icon.png") },
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
    navigateTo: "UserProfile",
  },
];

// Estilos específicos da tela (apenas layout e containers)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: RESPONSIVE.PADDING_XL,
  },
  emptyStateText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#999",
    textAlign: "center",
    lineHeight: RESPONSIVE.BODY_MEDIUM * 1.5,
  },
  resultsTitle: {
    fontSize: RESPONSIVE.SUBTITLE,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default function CategoryScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("search");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleCategoryPress = (category) => {
    navigation.navigate("Home", { selectedCategory: category.name });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      // Se o campo estiver vazio, limpa os resultados e mostra as categorias
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      // Busca todos os produtos da API
      const response = await axios.get("https://fakestoreapi.com/products");
      const allProducts = response.data;

      // Filtra produtos que contenham o termo pesquisado no título ou descrição
      const searchTerm = searchText.toLowerCase().trim();
      const filtered = allProducts.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = product.description
          ? product.description.toLowerCase().includes(searchTerm)
          : false;
        const categoryMatch = product.category
          ? product.category.toLowerCase().includes(searchTerm)
          : false;

        return titleMatch || descriptionMatch || categoryMatch;
      });

      setSearchResults(filtered);
    } catch (err) {
      setSearchError(err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* 1. Componente Genérico de Header (Reutilizado) */}
      <AppHeader
        title="SwapClass"
        onActionPress={() => navigateToFavorites(navigation)}
        actionIcon={require("../../assets/coracao-icon.png")}
      />

      {/* 3. Componente Genérico de Barra de Busca */}
      <SearchBarWithShadow
        placeholder="Pesquise sobre o que você gosta..."
        value={searchText}
        onChangeText={setSearchText}
        onSearchPress={handleSearch}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        searchIcon={require("../../assets/lupa-icon.png")}
        searchIconColor="#FF007A"
      />

      {/* Conteúdo: Resultados de Busca ou Categorias */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={
          hasSearched
            ? styles.productsContainer
            : styles.categoriesContainer
        }
        showsVerticalScrollIndicator={false}
      >
        {hasSearched ? (
          // Mostra resultados da busca
          <>
            <Text style={styles.resultsTitle}>
              {isSearching
                ? "Buscando..."
                : searchResults.length > 0
                ? `Resultados para "${searchText}" (${searchResults.length})`
                : `Nenhum resultado para "${searchText}"`}
            </Text>

            {isSearching ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FF007A" />
              </View>
            ) : searchError ? (
              <View style={styles.centered}>
                <Text style={styles.emptyStateText}>
                  Erro ao buscar produtos: {searchError}
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <View style={styles.productsGrid}>
                {searchResults.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={{
                      id: item.id,
                      imageUri: item.image,
                      price: formatPrice(item.price),
                      title: item.title,
                    }}
                    onPress={() =>
                      navigation.navigate("ProductDetail", {
                        productId: item.id,
                      })
                    }
                    onFavoritePress={() =>
                      console.log(`Favoritar item ${item.id}`)
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  Não encontramos produtos para "{searchText}"{"\n"}
                  Tente pesquisar com outras palavras!
                </Text>
              </View>
            )}
          </>
        ) : (
          // Mostra categorias quando não há busca
          <View style={styles.categoriesGrid}>
            {categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* 2. Componente Genérico de Navegação Inferior (Reutilizado) */}
      <BottomNavigationBar
        items={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigate={navigation.navigate}
      />
    </View>
  );
}
