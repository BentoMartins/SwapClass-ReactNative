import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';
import axios from 'axios';

//REcebe 'route' para pegar os parametros e 'navigation' para customizar o header
export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect para buscar os dados do produto
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); 

  //useLayoutEffect para mudar o titulo do header dinamicamente
  useLayoutEffect(() => {
    if (product) {
      navigation.setOptions({ title: product.title });
    }
  }, [navigation, product]); //Roda sempre que o produto for carregado

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  //Renderizaçao condicional para loading e erro
  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007bff" /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text>Erro ao carregar o produto: {error}</Text></View>;
  }

  if (!product) {
    return <View style={styles.centered}><Text>Produto não encontrado.</Text></View>;
  }

  //Renderizacao principal com os detalhes do produto
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.descriptionLabel}>Descrição:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  image: {
    width: '100%',
    height: isTablet() ? 400 : isSmallScreen() ? 250 : 300,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
  },
  detailsContainer: {
    padding: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_MEDIUM,
  },
  category: {
    fontSize: isSmallScreen() ? RESPONSIVE.BODY_SMALL : isTablet() ? RESPONSIVE.BODY_MEDIUM : RESPONSIVE.BODY_SMALL,
    color: '#6c757d',
    marginBottom: RESPONSIVE.MARGIN_XS,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: isSmallScreen() ? RESPONSIVE.SUBTITLE : isTablet() ? RESPONSIVE.SUBTITLE * 1.2 : RESPONSIVE.SUBTITLE,
    fontWeight: 'bold',
    marginBottom: RESPONSIVE.MARGIN_XS,
    lineHeight: isTablet() ? 30 : 26,
  },
  price: {
    fontSize: isSmallScreen() ? RESPONSIVE.TITLE_SMALL : isTablet() ? RESPONSIVE.TITLE_MEDIUM : RESPONSIVE.TITLE_SMALL,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: RESPONSIVE.MARGIN_SMALL,
  },
  descriptionLabel: {
    fontSize: isSmallScreen() ? RESPONSIVE.BODY_MEDIUM : isTablet() ? RESPONSIVE.BODY_LARGE : RESPONSIVE.BODY_MEDIUM,
    fontWeight: 'bold',
    marginBottom: RESPONSIVE.MARGIN_XS,
  },
  description: {
    fontSize: isSmallScreen() ? RESPONSIVE.BODY_MEDIUM : isTablet() ? RESPONSIVE.BODY_LARGE : RESPONSIVE.BODY_MEDIUM,
    lineHeight: isTablet() ? 28 : 24,
    color: '#343a40',
  },
});
