import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Image,
  Modal,
  Animated,
} from 'react-native';

export default function SellScreen({ navigation }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const conditionSlideAnim = useRef(new Animated.Value(300)).current;

  const categories = [
    'Móveis e artigos de decoração',
    'Eletrônicos',
    'Roupas e acessórios',
    'Tênis',
    'Livros e revistas',
    'Outros'
  ];

  const conditions = [
    'Novo - Nunca usado',
    'Usado - Condição de novo',
    'Usado - Bom estado',
    'Usado - Mal estado'
  ];

  useEffect(() => {
    if (showCategoryModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showCategoryModal]);

  useEffect(() => {
    if (showConditionModal) {
      Animated.timing(conditionSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(conditionSlideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showConditionModal]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePublish = () => {
    // Lógica para publicar o item
    console.log('Publicando item:', formData);
    navigation.navigate('Home');
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category: category
    }));
    setShowCategoryModal(false);
  };

  const handleConditionSelect = (condition) => {
    setFormData(prev => ({
      ...prev,
      condition: condition
    }));
    setShowConditionModal(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/voltar-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Image Upload Section */}
        <View style={styles.imageUploadSection}>
          <View style={styles.imagePlaceholder}>
            <Image source={require('../../assets/enviarFoto-icon.png')} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Adicionar fotos</Text>
            <Image 
              source={require('../../assets/estrelaAmarela-icon.png')} 
              style={styles.starIcon} 
            />
            <Image 
              source={require('../../assets/fita-icon.png')} 
              style={styles.tapeIcon} 
            />
          </View>
          <Text style={styles.uploadHint}>Máximo de 10 fotos. Escolha as suas melhores!</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Título</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite o título do item"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Preço</Text>
            <TextInput
              style={styles.textInput}
              placeholder="R$ 0,00"
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={styles.dropdownText}>
                {formData.category || 'Selecione uma categoria'}
              </Text>
              <Image source={require('../../assets/flecha-icon.png')} style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Condição</Text>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setShowConditionModal(true)}
            >
              <Text style={styles.dropdownText}>
                {formData.condition || 'Selecione a condição'}
              </Text>
              <Image source={require('../../assets/flecha-icon.png')} style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.optionalLabel}>Opcional</Text>
            <TextInput
              style={[styles.textInput, styles.descriptionInput]}
              placeholder="Descrição"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Additional Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Image source={require('../../assets/planeta-icon.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>Localização</Text>
            </View>
            <Image source={require('../../assets/mais-icon.png')} style={styles.plusIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Image source={require('../../assets/escola-icon.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>Universidade</Text>
            </View>
            <Image source={require('../../assets/mais-icon.png')} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShowCategoryModal(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.categoryModalContainer,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.categoryModalHeader}>
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={() => setShowCategoryModal(false)}
              >
                <Image source={require('../../assets/x-icon.png')} style={styles.closeModalIcon} />
              </TouchableOpacity>
              <Text style={styles.categoryModalTitle}>Selecione a categoria</Text>
            </View>
            
            <View style={styles.categoryList}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.categoryItemText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Condition Selection Modal */}
      <Modal
        visible={showConditionModal}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShowConditionModal(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.categoryModalContainer,
              { transform: [{ translateY: conditionSlideAnim }] }
            ]}
          >
            <View style={styles.categoryModalHeader}>
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={() => setShowConditionModal(false)}
              >
                <Image source={require('../../assets/x-icon.png')} style={styles.closeModalIcon} />
              </TouchableOpacity>
              <Text style={styles.categoryModalTitle}>Selecione a condição</Text>
            </View>
            
            <View style={styles.categoryList}>
              {conditions.map((condition, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => handleConditionSelect(condition)}
                >
                  <Text style={styles.categoryItemText}>{condition}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF007A',
  },
  publishButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,

  },
  publishText: {
    color: '#FF007A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingTop: 35,
    flex: 1,
    paddingBottom: 50,
  },
  contentContainer: {
    paddingHorizontal: 35,
    paddingVertical: 40,
    paddingBottom: 100,
  },
  imageUploadSection: {
    marginBottom: 30,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  uploadIcon: {
    width: 38,
    height: 35,
    tintColor: '#FF007A',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '500',
  },
  starIcon: {
    position: 'absolute',
    top: -30,
    right: -20,
    width: 80,
    height: 73,
    zIndex: 2,
  },
  tapeIcon: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 75,
    height: 75,
    zIndex: 2,
  },
  uploadHint: {
    fontSize: 16,
    marginTop: 10,
    color: '#8C8C8C',
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  optionalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#666',
  },
  dropdownIcon: {
    width: 15,
    height: 10,
    tintColor: '#FF007A',
  },
  optionsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  plusIcon: {
    width: 15,
    height: 15,
    tintColor: '#FF007A',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  // Category Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  categoryModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    minHeight: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeModalButton: {
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  closeModalIcon: {
    width: 17,
    height: 17,
  },
  categoryModalTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  categoryList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
