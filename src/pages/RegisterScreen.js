import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    celular: '',
    senha: '',
    confirmarSenha: '',
  });
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Verifica se todos os campos estão preenchidos e termos aceitos
  const isFormValid = () => {
    return formData.nome.trim() !== '' &&
           formData.sobrenome.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.celular.trim() !== '' &&
           formData.senha.trim() !== '' &&
           formData.confirmarSenha.trim() !== '' &&
           aceitaTermos;
  };

  const handleRegister = () => {
    if (!aceitaTermos) {
      Alert.alert('Erro', 'Você deve aceitar os termos de serviço para continuar.');
      return;
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (!formData.nome || !formData.sobrenome || !formData.email || !formData.celular || !formData.senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    
    // Aqui você pode adicionar a lógica de registro
    console.log('Dados do registro:', formData);
    navigation.navigate('Success');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Elementos decorativos */}
      <View style={styles.decorativeElements}>
        <Image 
          source={require('../../assets/icon1-register.png')} 
          style={styles.topLeftBlob}
          resizeMode="contain"
        />
        <Image 
          source={require('../../assets/icon2-register.png')} 
          style={styles.bottomRightBlob}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Cadastre-se já</Text>
          <Text style={styles.subtitle}>
            Junte-se a universitários da sua faculdade e de todo o país.
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formSection}>
          {/* Nome e Sobrenome */}
          <View style={styles.nameRow}>
            <View style={styles.halfInput}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={formData.nome}
                onChangeText={(value) => handleInputChange('nome', value)}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.halfInput}>
              <TextInput
                style={styles.input}
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChangeText={(value) => handleInputChange('sobrenome', value)}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Email Universitário */}
          <TextInput
            style={styles.fullInput}
            placeholder="Email Universitário"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Número de Celular */}
          <TextInput
            style={styles.fullInput}
            placeholder="Número de Celular"
            value={formData.celular}
            onChangeText={(value) => handleInputChange('celular', value)}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

          {/* Senha */}
          <TextInput
            style={styles.fullInput}
            placeholder="Senha"
            value={formData.senha}
            onChangeText={(value) => handleInputChange('senha', value)}
            placeholderTextColor="#999"
            secureTextEntry
          />

          {/* Confirmar Senha */}
          <TextInput
            style={styles.fullInput}
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            onChangeText={(value) => handleInputChange('confirmarSenha', value)}
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        {/* Checkbox e Termos */}
        <View style={styles.termsSection}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAceitaTermos(!aceitaTermos)}
          >
            <View style={[styles.checkbox, aceitaTermos && styles.checkboxChecked]}>
              {aceitaTermos && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              Ao continuar, você confirma e concorda com os{' '}
              <Text style={styles.termsLink}>Termos de Serviço</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Registro */}
        <TouchableOpacity 
          style={[
            styles.registerButton,
            isFormValid() ? styles.registerButtonActive : styles.registerButtonInactive
          ]}
          onPress={handleRegister}
          disabled={!isFormValid()}
        >
          <Text style={styles.registerButtonText}>REGISTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF55CC',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  topLeftBlob: {
    position: 'absolute',
    top: isTablet() ? -50 : 20,
    left: isTablet() ? -200 : -135,
    width: isTablet() ? 400 : 280,
    height: isTablet() ? 250 : 180,
  },
  bottomRightBlob: {
    position: 'absolute',
    bottom: isTablet() ? -1700 : -170,
    right: isTablet() ? -60 : -60,
    width: isTablet() ? 350 : 240,
    height: isTablet() ? 600 : 500,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: isTablet() ? 80 : 60,
    paddingHorizontal: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
    zIndex: 1,
  },
  titleSection: {
    marginBottom: RESPONSIVE.MARGIN_XL,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    marginBottom:-55,
    paddingVertical: 70,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#000',
    textAlign: 'center',
    lineHeight: isTablet() ? 28 : 24,
    marginBottom: -8,
  },
  formSection: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  nameRow: {
    flexDirection: isTablet() ? 'row' : 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: RESPONSIVE.MARGIN_SMALL,
  },
  halfInput: {
    flex: 1,
  },
  fullInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: 20,
    marginBottom: 8,
    fontSize: 14,
    minHeight: RESPONSIVE.INPUT_HEIGHT,
    textAlignVertical: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingHorizontal: RESPONSIVE.PADDING_SMALL,
    paddingVertical: 20,
    fontSize: 14,
    minHeight: RESPONSIVE.INPUT_HEIGHT,
    textAlignVertical: 'center',
  },
  termsSection: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -10,
  },
  checkbox: {
    width: RESPONSIVE.MARGIN_MEDIUM,
    height: RESPONSIVE.MARGIN_MEDIUM,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginRight: RESPONSIVE.MARGIN_XS,
    marginTop: -2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  checkboxChecked: {
    backgroundColor: '#FF007A',
    marginTop: -20,
  },
  checkmark: {
    color: '#fff',
    fontSize: RESPONSIVE.CAPTION,
    fontWeight: '900',
  },
  termsText: {
    flex: 1,
    fontSize: 11,
    color: '#303030',
    fontWeight: '400',
    lineHeight: 16,
    marginTop: -16,
  },
  termsLink: {
    color: '#303030',
    textDecorationLine: 'underline',
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    marginTop: -25,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    alignItems: 'center',
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
  },
  registerButtonInactive: {
    backgroundColor: '#5D5D5D',
  },
  registerButtonActive: {
    backgroundColor: '#3C1342',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: '800',
  },
});
