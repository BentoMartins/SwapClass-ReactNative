import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";
import { navigateToFavorites } from "../utils/navigationHelpers";
import axios from "axios";

// Componentes
import AppHeader from "../components/AppHeader";
import SectionHeader from "../components/SectionHeader";
import FavoriteProductCard from "../components/FavoriteProductCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_LARGE,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
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
});

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar produtos da FakeStore API (simulando favoritos)
  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        // Pegar alguns produtos para simular favoritos
        // Em produção, isso viria de uma API específica do usuário
        const products = response.data.slice(0, 4);
        
        // Adicionar alguns descontos para alguns produtos
        const favoritesWithDiscounts = products.map((product, index) => {
          const formattedPrice = formatPrice(product.price);
          // Adicionar desconto para alguns produtos
          if (index === 1 || index === 3) {
            const discount = 10;
            const originalPrice = formatPrice(product.price);
            const discountedPrice = formatPrice(product.price * 0.9);
            return {
              id: product.id,
              imageUri: product.image,
              price: discountedPrice,
              originalPrice: originalPrice,
              discount: discount,
              title: product.title,
            };
          }
          return {
            id: product.id,
            imageUri: product.image,
            price: formattedPrice,
            title: product.title,
          };
        });
        
        setFavorites(favoritesWithDiscounts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleBackPress = () => {
    // Verifica se há uma tela anterior na pilha de navegação
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Se não houver tela anterior, navega para a Home como fallback
      navigation.navigate("Home");
    }
  };

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  const handleFavoritePress = (productId) => {
    // Remover dos favoritos
    setFavorites(favorites.filter((item) => item.id !== productId));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header com botão de voltar, título centralizado e ícone de coração à direita */}
      <AppHeader
        title="SwapClass"
        onBackPress={handleBackPress}
        onActionPress={() => navigateToFavorites(navigation)}
        actionIcon={require("../../assets/coracaoPreenchido-icon.png")}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Título da seção com emoji */}
        <SectionHeader title="Coisas que curto" emojis="😁" />

        {/* Lista de produtos */}
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#3C1342" />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.emptyStateText}>
              Erro ao carregar favoritos: {error}
            </Text>
          </View>
        ) : favorites.length > 0 ? (
          <View style={styles.productsGrid}>
            {favorites.map((item) => (
              <FavoriteProductCard
                key={item.id}
                product={item}
                onPress={() => handleProductPress(item.id)}
                onFavoritePress={() => handleFavoritePress(item.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Tá fraco, hein?{"\n"}Adiciona mais coisa aí!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

