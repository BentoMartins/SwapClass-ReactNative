import React, { useState, useEffect} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet, getColumns } from '../utils/responsive';
import axios from 'axios';


export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); // Estado para controlar qual aba está ativa
  

useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data); //Armazena as categorias no estado
      } catch (err) {
        //Em caso de erro na busca de categorias registrar no console.
        console.error("Erro ao buscar categorias:", err);
      }
    };
    fetchCategories();
  }, []); //O array vazio garante que rode so uma vez.

  //Roda uma vez no inicio e toda vez que `selectedCategory` mudar
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      setError(null);     
      
      //Define o endpoint da API baseado na categoria
      const endpoint = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';

      try {
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);


  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  //Funcao para renderizar os botoes de filtro
  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Botao para Limpar o Filtro */}
        <TouchableOpacity
          style={[styles.chip, !selectedCategory ? styles.chipActive : null]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={styles.chipText}>Todos</Text>
        </TouchableOpacity>

        {/* Mapeia as categorias */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.chip, selectedCategory === category ? styles.chipActive : null]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.chipText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
    </TouchableOpacity>
  );
  

  // Se houver um erro, mostra a mensagem de erro
  if (error && !isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Ocorreu um erro:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SwapClass</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Image source={require('../../assets/coracao-icon.png')} style={styles.heartIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Seção "Do seu interesse" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Do seu interesse</Text>
            <Text style={styles.sectionEmojis}>👀👀</Text>
          </View>
          
          {isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#3C1342" />
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {products.slice(0, 6).map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  style={styles.productCard}
                  onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                >
                  <TouchableOpacity style={styles.cardHeartButton}>
                    <Text style={styles.cardHeartIcon}>♥</Text>
                  </TouchableOpacity>
                  <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                  <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Seção "Tudo até R$100!" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tudo até R$100!</Text>
            <Text style={styles.sectionEmojis}>💰💵</Text>
          </View>
          
          <View style={styles.productsGrid}>
            {products.filter(item => item.price <= 100).slice(0, 6).map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              >
                <TouchableOpacity style={styles.cardHeartButton}>
                  <Text style={styles.cardHeartIcon}>♥</Text>
                </TouchableOpacity>
                <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Image 
            source={activeTab === 'home' ? require('../../assets/casaPreenchida-icon.png') : require('../../assets/casa-icon.png')} 
            style={styles.navIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {
            setActiveTab('search');
            navigation.navigate('Category');
          }}
        >
          <Image source={require('../../assets/lupa-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('add')}
        >
          <Image source={require('../../assets/publicar-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Image source={require('../../assets/conta-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3C1342',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF007A',
  },
  heartButton: {
    padding: 8,
  },
  heartIcon: {
    width: 25,
    height: 22,
    tintColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionEmojis: {
    fontSize: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: 12,
    padding: 8,
    marginBottom: 15,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeartButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    padding: 4,
  },
  cardHeartIcon: {
    fontSize: 14,
    color: '#FF007A',
  },
  productImage: {
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#3C1342',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 60,
  },
  navItem: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  navIcon: {
    width: 27,
    height: 26,
    tintColor: '#fff',
  },
});

