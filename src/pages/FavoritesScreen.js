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
import productService from "../services/product";
import { useCurrency } from "../contexts/CurrencyContext";

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
    justifyContent: "flex-start",
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
  satiricalText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#9999",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default function FavoritesScreen({ navigation }) {
  const { currency } = useCurrency();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar produtos usando ProductService (simulando favoritos)
  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Em produção, isso viria de uma API específica do usuário
        // Por enquanto, busca produtos gerais e limita a 4
        const productsData = await productService.getProducts(currency, 0, 4);
        const productsList = Array.isArray(productsData) 
          ? productsData 
          : productsData?.content || productsData?.products || [];
        const products = productsList.slice(0, 4);
        
        // Adicionar alguns descontos para alguns produtos
        const favoritesWithDiscounts = products.map((product, index) => {
          const productCurrency = product.currency || currency;
          const formattedPrice = formatPrice(product.price, productCurrency);
          // Adicionar desconto para alguns produtos
          if (index === 1 || index === 3) {
            const discount = 10;
            const originalPrice = formatPrice(product.price, productCurrency);
            const discountedPrice = formatPrice(product.price * 0.9, productCurrency);
            return {
              id: product.id,
              imageUri: product.imageUrl || product.image,
              price: discountedPrice,
              originalPrice: originalPrice,
              discount: discount,
              title: product.brand || product.model || product.title || "Produto",
            };
          }
          return {
            id: product.id,
            imageUri: product.imageUrl || product.image,
            price: formattedPrice,
            title: product.brand || product.model || product.title || "Produto",
          };
        });
        
        setFavorites(favoritesWithDiscounts);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
        setError(err.message || "Erro ao carregar favoritos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [currency]);

  const formatPrice = (price, productCurrency = currency) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: productCurrency || "BRL",
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
          <>
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
            <Text style={styles.satiricalText}>
              Tá fraco, hein? Adiciona mais coisa aí!
            </Text>
          </>
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

