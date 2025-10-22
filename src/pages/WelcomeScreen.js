import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Seção da imagem de capa */}
      <View style={styles.imageSection}>
        <Image 
          source={require('../../assets/imagem-capa.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Gradiente de transição */}
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.7)', '#fff']}
          locations={[0, 0.3, 0.7, 1]}
          style={styles.gradientOverlay}
        />
      </View>

      {/* Seção de boas-vindas */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>BEM-VINDO AO SWAPCLASS!</Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.taglineFirst}>Novas histórias</Text>
          <Text style={styles.taglineSecond}>para coisas antigas.</Text>
        </View>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttonsSection}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageSection: {
    height: isTablet() ? '40%' : isLargeScreen() ? '45%' : '50%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: RESPONSIVE.MARGIN_SMALL,
  },
  welcomeSection: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_LARGE,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FF007A',
    marginBottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
  },
  taglineContainer: {
    alignItems: 'center',
  },
  taglineFirst: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3C1342',
    marginBottom: -RESPONSIVE.MARGIN_XS,
    textAlign: 'center',
  },
  taglineSecond: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF007A',
    textAlign: 'center',
  },
  buttonsSection: {
    flexDirection: isTablet() ? 'row' : 'row',
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
    justifyContent: 'space-between',
    gap: RESPONSIVE.MARGIN_SMALL,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#3C1342',
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: 'center',
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#FF007A',
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
