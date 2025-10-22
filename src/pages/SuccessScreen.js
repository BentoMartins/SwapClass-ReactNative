import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';

export default function SuccessScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Conteúdo central */}
      <View style={styles.contentContainer}>
        {/* Mensagem de sucesso */}
        <Text style={styles.successTitle}>Cadastro concluído com sucesso!</Text>
        
        {/* Ícone central */}
        <Image 
          source={require('../../assets/icon-sentado.png')} 
          style={styles.centralIcon}
          resizeMode="contain"
        />
        
        {/* Mensagem de boas-vindas */}
        <Text style={styles.welcomeText}>
          Seja bem-vindo(a) ao seu marketplace universitário.
        </Text>
        
        {/* Botão CONTINUAR */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUAR</Text>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_MEDIUM,
    paddingTop: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_LARGE,
    paddingBottom: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_LARGE,
  },
  successTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: isTablet() ? RESPONSIVE.MARGIN_LARGE : RESPONSIVE.MARGIN_MEDIUM,
    lineHeight: isTablet() ? 40 : 32,
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
  },
  centralIcon: {
    width: 230,
    height: 230,
    marginBottom: isTablet() ? RESPONSIVE.MARGIN_LARGE : RESPONSIVE.MARGIN_MEDIUM,
  },
  welcomeText: {
    fontSize: 27,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: isTablet() ? RESPONSIVE.MARGIN_XL : RESPONSIVE.MARGIN_LARGE,
    lineHeight: isTablet() ? 36 : 28,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
  },
  continueButton: {
    backgroundColor: '#FF1493', 
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    paddingHorizontal: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT * 0.8,
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: isTablet() ? RESPONSIVE.BODY_LARGE : RESPONSIVE.BODY_MEDIUM,
    fontWeight: '600',
    textAlign: 'center',
  },
});
