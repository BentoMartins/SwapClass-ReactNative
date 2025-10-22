import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSendRecoveryEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    setIsLoading(true);

    try {
      // Simular envio de email (aqui você integraria com sua API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mostrar modal de sucesso
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título */}
        <Text style={styles.title}>Recuperação de senha</Text>

        {/* Ilustração central */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/icon-senha.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Formulário */}
        <View style={styles.formSection}>
          {/* Campo de Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Botões */}
        <View style={styles.buttonsSection}>
          {/* Botão Enviar Email */}
          <TouchableOpacity 
            style={styles.sendEmailButton}
            onPress={handleSendRecoveryEmail}
            disabled={isLoading}
          >
            <Text style={styles.sendEmailButtonText}>
              {isLoading ? 'ENVIANDO...' : 'ENVIAR EMAIL DE RECUPERAÇÃO'}
            </Text>
          </TouchableOpacity>

          {/* Botão Voltar ao Login */}
          <TouchableOpacity 
            style={styles.backToLoginButton}
            onPress={handleBackToLogin}
          >
            <Text style={styles.backToLoginButtonText}>VOLTAR AO LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Sucesso */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Decoração estrela amarela */}
            <Image 
              source={require('../../assets/estrela-icon.png')} 
              style={styles.starDecoration}
              resizeMode="contain"
            />
            
            {/* Título do modal */}
            <Text style={styles.modalTitle}>Sucesso!</Text>
            
            {/* Ilustração do post-it de email */}
            <View style={styles.envelopeContainer}>
              <Image 
                source={require('../../assets/carta-icon.png')} 
                style={styles.emailStickyNoteImage}
                resizeMode="contain"
              />
            </View>
            
            {/* Mensagem */}
            <Text style={styles.modalMessage}>
              Um e-mail com o link para redefinir sua senha foi enviado.
            </Text>
            
            {/* Botão OK */}
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAEE7', // Rosa claro como no Figma
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: isTablet() ? 80 : 60,
    paddingHorizontal: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_LARGE,
    paddingBottom: RESPONSIVE.PADDING_XL,
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: -5,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: isTablet() ? 400 : 400,
    height: isTablet() ? 300 : 250,
  },
  inputContainer: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: 5,
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: 20,
    fontSize: 14,
    minHeight: RESPONSIVE.INPUT_HEIGHT,
    textAlignVertical: 'center',
  },
  buttonsSection: {
    gap: RESPONSIVE.MARGIN_MEDIUM,
  },
  sendEmailButton: {
    backgroundColor: '#FF007A', // Rosa choque como no Figma
    borderRadius: 5,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: 'center',
    marginTop: -15,
  },
  sendEmailButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  backToLoginButton: {
    backgroundColor: '#fff',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    borderWidth: 2,
    borderColor: '#3C1342',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: 'center',
    marginTop: -10,
  },
  backToLoginButtonText: {
    color: '#3C1342',
    fontSize: 14,
    fontWeight: '800',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF8DC', // Cor creme como no Figma
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#000',
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    padding: 30,
    margin: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    position: 'relative',
  },
  starDecoration: {
    position: 'absolute',
    top: -45,
    right: -50,
    width: 110,
    height: 110,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
    marginBottom: -15,
    textAlign: 'center',
  },
  envelopeContainer: {
    marginBottom: 20,
  },
  emailStickyNoteImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  modalMessage: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,  
    marginTop: -30,
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#FF007A',
    paddingHorizontal: 110,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
});
