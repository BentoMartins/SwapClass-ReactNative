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
import productService from "../services/product";
import { useCurrency } from "../contexts/CurrencyContext";

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
    activeIcon: require("../../assets/contaPreenchida-icon.png"),
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
    paddingBottom: 10,
    paddingTop: 15,
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
    justifyContent: "flex-start",
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
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState("search");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleCategoryPress = (category) => {
    navigation.navigate("Home", { selectedCategory: category.name });
  };

  const formatPrice = (price, productCurrency = currency) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: productCurrency || "BRL",
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
      // Busca produtos usando o ProductService
      const results = await productService.searchProducts(searchText.trim(), currency);
      
      // A API pode retornar um array diretamente ou dentro de content
      const productsList = Array.isArray(results) 
        ? results 
        : results?.content || results?.products || [];
      
      setSearchResults(productsList);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setSearchError(err.message || "Erro ao buscar produtos");
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
        showBackButton={false}
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
                      imageUri: item.imageUrl || item.image,
                      price: formatPrice(item.price, item.currency),
                      title: item.brand || item.model || item.title || "Produto",
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
