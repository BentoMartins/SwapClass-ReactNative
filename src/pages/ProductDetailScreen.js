import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
  Alert,
  Animated,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";
import productService from "../services/product";
import favoritesService from "../services/favorites";
import { useCurrency } from "../contexts/CurrencyContext";
import { useAuth } from "../contexts/AuthContext";
import { getConditionName, getCategoryName } from "../utils/constants";

// Componentes de Detalhes do Produto
import ProductDetailHeader from "../components/ProductDetailHeader";
import ProductImageCarousel from "../components/ProductImageCarousel";
import ProductInfoSection from "../components/ProductInfoSection";
import ProductDescriptionSection from "../components/ProductDescriptionSection";
import ProductConditionSection from "../components/ProductConditionSection";
import ProductCategorySection from "../components/ProductCategorySection";
import LocationSection from "../components/LocationSection";
import UniversitySection from "../components/UniversitySection";
import DataLoadingState from "../components/DataLoadingState";
import ActionSheetModal from "../components/ActionSheetModal";
import ShadowButton from "../components/ShadowButton";

// Estilos específicos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const { currency, changeCurrency } = useCurrency();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  
  // Animação para o modal de moeda
  const currencySlideAnim = useRef(new Animated.Value(300)).current;
  
  // Moedas disponíveis
  const availableCurrencies = ["BRL", "USD", "EUR"];

  // Lógica de busca de dados
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await productService.getProductById(productId, currency);
        
        if (result.error) {
          setError(result.error);
          setProduct(null);
        } else {
          setProduct(result.product);
          // Inicializa o preço exibido com o preço original do produto
          setDisplayPrice(result.product.price);
          setDisplayCurrency(result.product.currency || currency);
          
          // Verifica se o produto está favoritado
          const favoriteStatus = await favoritesService.isFavorite(productId);
          setIsFavorite(favoriteStatus);
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError(err.message || "Erro ao carregar produto");
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, currency]);

  // Função utilitária para formatação
  const formatPrice = (price, productCurrency = currency) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: productCurrency || "BRL",
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

  const handleFavoritePress = async () => {
    if (!product || isLoadingFavorite) return;
    
    setIsLoadingFavorite(true);
    try {
      const newFavoriteStatus = await favoritesService.toggleFavorite(product.id);
      setIsFavorite(newFavoriteStatus);
    } catch (error) {
      console.error("Erro ao favoritar produto:", error);
    } finally {
      setIsLoadingFavorite(false);
    }
  };

  // Função para abrir o modal de seleção de moeda
  const handleOpenCurrencyModal = () => {
    setShowCurrencyModal(true);
  };

  // Função para converter o preço para a moeda selecionada
  const handleConvertPrice = async (selectedCurrency) => {
    if (!product || isConverting) return;

    // Fecha o modal
    setShowCurrencyModal(false);

    // Se a moeda selecionada for a mesma da atual, não faz nada
    const currentCurrency = displayCurrency || product.currency || currency;
    if (selectedCurrency === currentCurrency) {
      return;
    }

    setIsConverting(true);
    
    try {
      const result = await productService.convertProductPrice(productId, selectedCurrency);
      
      if (result.error) {
        Alert.alert("Erro", result.error);
      } else if (result.convertedPrice !== null && result.convertedPrice !== undefined) {
        setDisplayPrice(result.convertedPrice);
        setDisplayCurrency(result.currency);
      } else {
        Alert.alert("Erro", "Preço convertido não disponível.");
      }
    } catch (err) {
      console.error("Erro ao converter preço:", err);
      Alert.alert("Erro", "Não foi possível converter o preço. Tente novamente.");
    } finally {
      setIsConverting(false);
    }
  };

  // Obtém o texto do botão de conversão (mostra a moeda atual)
  const getConvertButtonText = () => {
    const currentCurrency = displayCurrency || product?.currency || currency;
    return currentCurrency;
  };

  // Função para abrir WhatsApp
  const openWhatsApp = async (sellerPhone) => {
    const productTitle = product?.brand || product?.model || product?.title || "Produto";
    const productPrice = product?.price ? formatPrice(product.price, product?.currency) : "";

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

  // Obtém o nome do vendedor do produto ou do usuário logado
  const getSellerName = () => {
    // Prioridade: sellerName do produto > seller.name > owner.name > user.name > user.name (logado)
    return product?.sellerName || 
           product?.seller?.name || 
           product?.owner?.name || 
           product?.user?.name || 
           product?.creator?.name ||
           user?.name || 
           "Vendedor";
  };

  // Obtém o avatar do vendedor do produto ou usa o padrão
  const getSellerAvatar = () => {
    return product?.sellerAvatar || 
           product?.seller?.avatar || 
           product?.owner?.avatar || 
           product?.user?.avatar ||
           require("../../assets/user-icon.png");
  };

  // Obtém o telefone do vendedor do produto
  const getSellerPhone = () => {
    return product?.sellerPhone || 
           product?.seller?.phone || 
           product?.owner?.phone || 
           product?.user?.phone ||
           user?.phone || // Busca do usuário logado
           null;
  };

  // Dados mockados para demonstração (mantidos apenas para campos não disponíveis na API)
  const mockData = {
    distance: "Perto - 4 km",
    location: "Passo Fundo - RS",
    universityName: "UPF - Universidade de Passo Fundo",
  };

  // Função para obter a condição formatada do produto
  const getProductCondition = () => {
    if (!product?.condition) {
      return "Condição não informada";
    }
    return getConditionName(product.condition);
  };

  // Função para obter a categoria formatada do produto
  const getProductCategory = () => {
    if (!product?.category) {
      return "Categoria não informada";
    }
    return getCategoryName(product.category);
  };

  // Atualiza handleMessagePress para usar o telefone do vendedor
  const handleMessagePressWithData = () => {
    const sellerPhone = getSellerPhone();
    if (sellerPhone) {
      openWhatsApp(sellerPhone);
    } else {
      Alert.alert("Informação", "Telefone do vendedor não disponível.");
    }
  };

  // Função para deletar produto
  const handleDeleteProduct = () => {
    if (!productId) {
      Alert.alert("Erro", "ID do produto não encontrado.");
      return;
    }

    Alert.alert(
      "Deletar Anúncio",
      "Tem certeza que deseja deletar este anúncio? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await productService.deleteProduct(productId);
              
              if (result.success) {
                Alert.alert(
                  "Sucesso",
                  "Anúncio deletado com sucesso!",
                  [
                    {
                      text: "OK",
                      onPress: () => navigation.goBack(),
                    },
                  ]
                );
              } else {
                Alert.alert("Erro", result.error || "Não foi possível deletar o anúncio.");
              }
            } catch (error) {
              console.error("Erro ao deletar produto:", error);
              Alert.alert("Erro", "Ocorreu um erro ao deletar o anúncio. Tente novamente.");
            }
          },
        },
      ]
    );
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
          imageUri={product.imageUrl || product.image}
          currentIndex={1}
          totalImages={1}
        />

        {/* Seção de informações principais */}
        <ProductInfoSection
          title={product.brand || product.model || product.title || "Produto"}
          price={formatPrice(displayPrice || product.price, displayCurrency || product.currency)}
          listedTime={getListedTime()}
          distance={mockData.distance}
          sellerName={getSellerName()}
          sellerAvatar={getSellerAvatar()}
          onMessagePress={handleMessagePressWithData}
          onConvertPress={handleOpenCurrencyModal}
          convertButtonText={product ? getConvertButtonText() : null}
        />

        {/* Seção de descrição */}
        <ProductDescriptionSection
          description={product.description || ""}
          bulletPoints={[]}
          highlightText={""}
        />

        {/* Seção de categoria */}
        <ProductCategorySection category={getProductCategory()} />

        {/* Seção de condição */}
        <ProductConditionSection condition={getProductCondition()} />

        {/* Seção de localização */}
        <LocationSection
          mapImageUri={null} // Imagem removida
          location={mockData.location}
        />

        {/* Seção de universidade */}
        <UniversitySection
          universityImageUri={null} // Imagem removida
          universityName={mockData.universityName}
        />

        {/* Botão de Deletar Anúncio */}
        <ShadowButton
          title="DELETAR ANÚNCIO"
          onPress={handleDeleteProduct}
          backgroundColor="#FF0000"
          textColor="#FFFFFF"
          style={{ 
            marginTop: RESPONSIVE.MARGIN_MEDIUM, 
            marginBottom: RESPONSIVE.MARGIN_LARGE, 
            marginHorizontal: RESPONSIVE.PADDING_LARGE || 40,
            paddingVertical: 10,
            paddingHorizontal: 16,
            minHeight: 35,
            alignSelf: "center",
            width: "60%",
          }}
          textStyle={{ fontSize: 12 }}
        />
      </ScrollView>

      {/* Modal de Seleção de Moeda */}
      <ActionSheetModal
        isVisible={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title="Selecione a moeda"
        items={availableCurrencies}
        onItemSelected={handleConvertPrice}
        slideAnim={currencySlideAnim}
      />
    </View>
  );
}
