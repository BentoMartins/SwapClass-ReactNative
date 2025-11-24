import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { RESPONSIVE, getColumns } from "../utils/responsive";
import productService from "../services/product";
import favoritesService from "../services/favorites";
import { useCurrency } from "../contexts/CurrencyContext";

// Componentes
import AppHeader from "../components/AppHeader";
import ProductCard from "../components/ProductCard";

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
  sectionTitle: {
    fontSize: RESPONSIVE.SUBTITLE,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    paddingHorizontal: 15,
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

export default function MyAdsScreen({ navigation }) {
  const { currency } = useCurrency();
  const [myAds, setMyAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar produtos usando ProductService
  useEffect(() => {
    const fetchMyAds = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Em produção, isso viria de uma API específica do usuário
        // Por enquanto, busca produtos gerais e limita a 6
        const productsData = await productService.getProducts(currency, 0, 6);
        const productsList = Array.isArray(productsData) 
          ? productsData 
          : productsData?.content || productsData?.products || [];
        setMyAds(productsList.slice(0, 6));
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setError(err.message || "Erro ao carregar anúncios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyAds();
  }, [currency]);

  const formatPrice = (price, productCurrency = currency) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: productCurrency || "BRL",
    });
  };

  // Função para favoritar/desfavoritar produto
  const handleFavoritePress = async (product) => {
    try {
      await favoritesService.toggleFavorite(product.id);
    } catch (error) {
      console.error("Erro ao favoritar produto:", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header com botão de voltar */}
      <AppHeader
        title="SwapClass"
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Título da seção */}
        <Text style={styles.sectionTitle}>Meus anúncios</Text>

        {/* Lista de produtos */}
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#3C1342" />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.emptyStateText}>
              Erro ao carregar anúncios: {error}
            </Text>
          </View>
        ) : myAds.length > 0 ? (
          <>
            <View style={styles.productsGrid}>
              {myAds.map((item) => (
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    imageUri: item.imageUrl || item.image,
                    price: formatPrice(item.price, item.currency),
                    title: item.brand || item.model || item.title || "Produto",
                  }}
                  onPress={() => handleProductPress(item.id)}
                  onFavoritePress={() => handleFavoritePress(item)}
                />
              ))}
            </View>
            <Text style={styles.satiricalText}>
              Tá limpinho demais por aqui...{"\n"}cadê os anúncios?
            </Text>
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Tá limpinho demais por aqui...{"\n"}cadê os anúncios?
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

