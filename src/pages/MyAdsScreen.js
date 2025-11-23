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
import axios from "axios";

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
  const [myAds, setMyAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar produtos da FakeStore API
  useEffect(() => {
    const fetchMyAds = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        // Pegar alguns produtos para simular "meus anúncios"
        // Em produção, isso viria de uma API específica do usuário
        setMyAds(response.data.slice(0, 6)); // Primeiros 6 produtos
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyAds();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
                    imageUri: item.image,
                    price: formatPrice(item.price),
                    title: item.title,
                  }}
                  onPress={() => handleProductPress(item.id)}
                  onFavoritePress={() => console.log(`Favoritar item ${item.id}`)}
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

