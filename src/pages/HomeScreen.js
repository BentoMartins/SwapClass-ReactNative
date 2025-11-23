import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { RESPONSIVE, getColumns } from "../utils/responsive";
import { navigateToFavorites } from "../utils/navigationHelpers";
import productService from "../services/product";
import { useCurrency } from "../contexts/CurrencyContext";

// Componentes Genéricos
import AppHeader from "../components/AppHeader"; // Novo Componente
import SectionHeader from "../components/SectionHeader"; // Novo Componente
import ProductCard from "../components/ProductCard"; // Novo Componente
import BottomNavigationBar from "../components/BottomNavigationBar"; // Novo Componente
// O ChipFilter foi removido, pois o filtro não é renderizado na tela fornecida.

// Estilos específicos da tela (layout e containers)
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 30,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});

export default function HomeScreen({ navigation }) {
  const { currency } = useCurrency();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  // Esta lógica de categorias e filtros não está sendo usada no corpo do 'return',
  // mas é mantida aqui caso seja para uma seção futura da Home.
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // ... Lógica de fetchCategories (mantida para reuso futuro)
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productsData = await productService.getProducts(currency, 0, 20);
        // A API pode retornar um array diretamente ou dentro de content
        const productsList = Array.isArray(productsData) 
          ? productsData 
          : productsData?.content || productsData?.products || [];
        setProducts(productsList);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(err.message || "Erro ao carregar produtos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, currency]);

  const formatPrice = (price, productCurrency = currency) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: productCurrency || "BRL",
    });
  };

  // Se houver um erro, mostra a mensagem de erro
  if (error && !isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Ocorreu um erro:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  // Define os itens de navegação (para passar ao BottomNavigationBar)
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* 1. Componente Genérico de Header */}
      <AppHeader
        title="SwapClass"
        onActionPress={() => navigateToFavorites(navigation)}
        actionIcon={require("../../assets/coracao-icon.png")}
        showBackButton={false}
      />

      <ScrollView style={styles.scrollContainer}>
        {/* Seção "Do seu interesse" */}
        <View style={styles.section}>
          {/* 2. Componente Genérico de Header de Seção */}
          <SectionHeader title="Do seu interesse" emojis="👀👀" />

          {isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#3C1342" />
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {products.slice(0, 6).map((item) => (
                // 3. Componente Genérico de Card de Produto
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    imageUri: item.imageUrl || item.image,
                    price: formatPrice(item.price, item.currency),
                    title: item.brand || item.model || item.title || "Produto",
                  }}
                  onPress={() =>
                    navigation.navigate("ProductDetail", { productId: item.id })
                  }
                  onFavoritePress={() =>
                    console.log(`Favoritar item ${item.id}`)
                  }
                />
              ))}
            </View>
          )}
        </View>

        {/* Seção "Tudo até R$100!" */}
        <View style={styles.section}>
          {/* 2. Componente Genérico de Header de Seção */}
          <SectionHeader title="Tudo até R$100!" emojis="💰💵" />

            <View style={styles.productsGrid}>
            {products
              .filter((item) => {
                // Considera conversão de moeda se necessário
                const price = item.price || 0;
                return price <= 100;
              })
              .slice(0, 6)
              .map((item) => (
                // 3. Componente Genérico de Card de Produto
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    imageUri: item.image,
                    price: formatPrice(item.price),
                    title: item.title,
                  }}
                  onPress={() =>
                    navigation.navigate("ProductDetail", { productId: item.id })
                  }
                  onFavoritePress={() =>
                    console.log(`Favoritar item ${item.id}`)
                  }
                />
              ))}
          </View>
        </View>

        {/* Seção "Para melhorar seu jeito de estudar" */}
        <View style={styles.section}>
          {/* 2. Componente Genérico de Header de Seção */}
          <SectionHeader title="Para melhorar seu jeito de 
          estudar 📚" emojis="" />

          <View style={styles.productsGrid}>
            {products
              .slice(6, 12)
              .map((item) => (
                // 3. Componente Genérico de Card de Produto
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    imageUri: item.image,
                    price: formatPrice(item.price),
                    title: item.title,
                  }}
                  onPress={() =>
                    navigation.navigate("ProductDetail", { productId: item.id })
                  }
                  onFavoritePress={() =>
                    console.log(`Favoritar item ${item.id}`)
                  }
                />
              ))}
          </View>
        </View>
      </ScrollView>

      {/* 4. Componente Genérico de Navegação Inferior */}
      <BottomNavigationBar
        items={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigate={navigation.navigate}
      />
    </View>
  );
}
