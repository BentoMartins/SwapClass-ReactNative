import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";
import axios from "axios";

// Componentes de Detalhes do Produto
import ProductDetailHeader from "../components/ProductDetailHeader";
import ProductImageCarousel from "../components/ProductImageCarousel";
import ProductInfoSection from "../components/ProductInfoSection";
import ProductDescriptionSection from "../components/ProductDescriptionSection";
import ProductConditionSection from "../components/ProductConditionSection";
import LocationSection from "../components/LocationSection";
import UniversitySection from "../components/UniversitySection";
import DataLoadingState from "../components/DataLoadingState";

// Estilos específicos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Lógica de busca de dados
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Função utilitária para formatação
  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para calcular tempo desde a listagem (mock)
  const getListedTime = () => {
    // Mock: retorna tempo aleatório para demonstração
    const hours = Math.floor(Math.random() * 24) + 1;
    return `Listado à ${hours} ${hours === 1 ? "hora" : "horas"}`;
  };

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  // Função para abrir WhatsApp
  const openWhatsApp = async (sellerPhone) => {
    const productTitle = product?.title || "Produto";
    const productPrice = product?.price ? formatPrice(product.price) : "";

    // Mensagem pré-formatada
    const message = `Olá! Tenho interesse no produto: ${productTitle}${productPrice ? ` - ${productPrice}` : ""}`;

    // Formata o número removendo caracteres não numéricos
    const cleanPhone = sellerPhone.replace(/\D/g, "");

    // URL do WhatsApp
    const whatsappUrl = `whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    const whatsappWebUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    try {
      // Tenta abrir o app do WhatsApp
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Se não conseguir abrir o app, tenta abrir no navegador
        const canOpenWeb = await Linking.canOpenURL(whatsappWebUrl);
        if (canOpenWeb) {
          await Linking.openURL(whatsappWebUrl);
        } else {
          Alert.alert(
            "Erro",
            "Não foi possível abrir o WhatsApp. Verifique se o aplicativo está instalado."
          );
        }
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível abrir o WhatsApp. Tente novamente."
      );
      console.error("Erro ao abrir WhatsApp:", error);
    }
  };

  // Renderização Condicional com DataLoadingState
  if (isLoading || error || !product) {
    return (
      <View style={styles.container}>
        <ProductDetailHeader
          onBackPress={handleBackPress}
          onFavoritePress={handleFavoritePress}
          isFavorite={isFavorite}
        />
        <DataLoadingState
          isLoading={isLoading}
          error={error}
          data={product}
          loadingComponent={<ActivityIndicator size="large" color="#FF007A" />}
          errorText={`Erro ao carregar o produto: ${error}`}
          notFoundText="Produto não encontrado."
        />
      </View>
    );
  }

  // Dados mockados para demonstração (substituir com dados reais da API)
  const mockData = {
    distance: "Perto - 4 km",
    sellerName: "Gabriel Rico",
    sellerPhone: "5551999999999", // Formato: código do país + DDD + número
    sellerAvatar: require("../../assets/user-icon.png"),
    condition: "Novo - Nunca Usado.",
    description: "Mesinha de estudo simples e funcional\nIdeal para quem busca praticidade e organização no dia a dia.",
    bulletPoints: [
      "Estrutura firme e estável",
      "Tampo amplo para livros, notebook ou materiais de estudo",
      "Cor neutra que combina com qualquer ambiente",
    ],
    highlightText: "Perfeita para quarto, escritório ou home office.\nNUNCA USADA",
    location: "Passo Fundo - RS",
    universityName: "UPF - Universidade de Passo Fundo",
  };

  // Atualiza handleMessagePress para usar o número do mockData
  const handleMessagePressWithData = () => {
    openWhatsApp(mockData.sellerPhone);
  };

  // Renderização principal com os detalhes do produto
  return (
    <View style={styles.container}>
      {/* Header com botões de voltar e favoritar */}
      <ProductDetailHeader
        onBackPress={handleBackPress}
        onFavoritePress={handleFavoritePress}
        isFavorite={isFavorite}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Imagem do produto com indicador */}
        <ProductImageCarousel
          imageUri={product.image}
          currentIndex={1}
          totalImages={1}
        />

        {/* Seção de informações principais */}
        <ProductInfoSection
          title={product.title}
          price={formatPrice(product.price)}
          listedTime={getListedTime()}
          distance={mockData.distance}
          sellerName={mockData.sellerName}
          sellerAvatar={mockData.sellerAvatar}
          onMessagePress={handleMessagePressWithData}
        />

        {/* Seção de descrição */}
        <ProductDescriptionSection
          description={mockData.description}
          bulletPoints={mockData.bulletPoints}
          highlightText={mockData.highlightText}
        />

        {/* Seção de condição */}
        <ProductConditionSection condition={mockData.condition} />

        {/* Seção de localização */}
        <LocationSection
          mapImageUri={require("../../assets/imagem-capa.png")} // Placeholder - substituir com imagem real do mapa
          location={mockData.location}
        />

        {/* Seção de universidade */}
        <UniversitySection
          universityImageUri={require("../../assets/escola-icon.png")} // Placeholder - substituir com imagem real da universidade
          universityName={mockData.universityName}
        />
      </ScrollView>
    </View>
  );
}
