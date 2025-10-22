import { useState } from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    Image,
} from 'react-native';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //login function
  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert('Erro', 'Preencha todos os campos de email e senha.');
        return;
    }
    
    setIsLoading(true);

    try {
        //verifica usuarios
        const userResponse = await axios.get('https://fakestoreapi.com/users');
        const users = await userResponse.data;

        const userExists = users.find(user => user.email === email);

        if (!userExists) {
            throw new Error('Usuário não encontrado.');
        }

        await axios.post('https://fakestoreapi.com/auth/login', {
            username: userExists.username,
            password: password,
        });
        
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('Home');

    } catch (error) {
        let errorMessage = 'Ocorreu um erro. Tente novamente.';

        //servidor respondeu com um erro
        if (error.response && error.response.data) {
            errorMessage = error.response.data;
        } else if (error.request) {
            errorMessage = 'Não foi possível conectar ao servidor. Verifique sua internet.';
        } else {
            errorMessage = error.message;
        }
        
        Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Elementos decorativos */}
      <View style={styles.decorativeElements}>
        <Image 
          source={require('../../assets/icon1-login.png')} 
          style={styles.topRightBlob}
          resizeMode="contain"
        />
        <Image 
          source={require('../../assets/icon2-login.png')} 
          style={styles.bottomLeftBlob}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título */}
        <Text style={styles.title}>Login</Text>

        {/* Formulário */}
        <View style={styles.formSection}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email universitário</Text>
            <TextInput
              style={styles.input}
              placeholder="nome.sobrenome@universidade.edu.br"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          {/* Link Esqueceu senha */}
          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Login */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        {/* Link para Criar Conta */}
        <TouchableOpacity 
          style={styles.registerLinkContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerLinkText}>Não tem uma conta? Crie uma.</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEA00', 
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  topRightBlob: {
    position: 'absolute',
    top: isTablet() ? 60 : 40,
    right: isTablet() ? -200 : -160,
    width: isTablet() ? 400 : 300,
    height: isTablet() ? 400 : 300,
  },
  bottomLeftBlob: {
    position: 'absolute',
    bottom: isTablet() ? -180 : -140,
    left: isTablet() ? -100 : -80,
    width: isTablet() ? 400 : 300,
    height: isTablet() ? 400 : 300,
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
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  formSection: {
    marginBottom: RESPONSIVE.MARGIN_XL,
  },
  inputContainer: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  label: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: '650',
    color: '#000',
    marginBottom: 2,
    paddingHorizontal: 8,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -30,
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FF007A',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    paddingVertical: RESPONSIVE.PADDING_SMALL,
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    alignItems: 'center',
    marginBottom: RESPONSIVE.MARGIN_LARGE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: RESPONSIVE.BUTTON_HEIGHT,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: RESPONSIVE.BODY_LARGE,
    fontWeight: '900',
  },
  registerLinkContainer: {
    alignItems: 'center',
    marginTop: RESPONSIVE.MARGIN_XS,
  },
  registerLinkText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: '#5D5D5D',
    textAlign: 'center',
  },
});

