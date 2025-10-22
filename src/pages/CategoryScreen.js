import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';

export default function CategoryScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchText, setSearchText] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Móveis',
      icon: require('../../assets/cadeira-icon.png'),

    },
    {
      id: 2,
      name: 'Eletrônicos',
      icon: require('../../assets/computador-icon.png'),
    },
    {
      id: 3,
      name: 'Roupas',
      icon: require('../../assets/camisa-icon.png'),
    },
    {
      id: 4,
      name: 'Tênis',
      icon: require('../../assets/tenis-icon.png'),
    },
    {
      id: 5,
      name: 'Livros',
      icon: require('../../assets/livros-icon.png'),
    },
    {
      id: 6,
      name: 'Outros',
      icon: require('../../assets/lampada-icon.png'),
    }
  ];

  const handleCategoryPress = (category) => {
    // Navegar para a tela de produtos da categoria
    navigation.navigate('Home', { selectedCategory: category.name });
  };

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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise sobre o que você gosta..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Image source={require('../../assets/lupa-icon.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.categoriesContainer}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                category.isSelected && styles.selectedCategoryCard
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              {category.emoji && (
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              )}
              <Image source={category.icon} style={styles.categoryImage} resizeMode="contain" />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {
            setActiveTab('home');
            navigation.navigate('Home');
          }}
        >
          <Image 
            source={activeTab === 'home' ? require('../../assets/casaPreenchida-icon.png') : require('../../assets/casa-icon.png')} 
            style={styles.navIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('search')}
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
  container: {
    flex: 1,
    backgroundColor: '#FF55CC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3C1342',
    paddingHorizontal: 20,
    paddingTop: 50,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    padding: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF007A',
  },
  scrollContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryCard: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  categoryEmoji: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 16,
    zIndex: 1,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
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
