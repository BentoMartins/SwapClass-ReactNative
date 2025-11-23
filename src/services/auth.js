import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';

export const authService = {
  // Registro de novo usuário
  signup: async (name, email, password) => {
    const response = await api.post('/auth/signup', {
      name,
      email,
      password,
    });
    
    // Extrai o token da resposta, tratando diferentes formatos
    let token = null;
    if (typeof response.data === 'string') {
      token = response.data;
    } else if (response.data?.token) {
      token = response.data.token;
    } else if (response.data?.accessToken) {
      token = response.data.accessToken;
    }
    
    // Garante que o token seja uma string antes de salvar
    if (token && typeof token === 'string') {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    }
    
    return response.data;
  },

  // Login
  signin: async (email, password) => {
    const response = await api.post('/auth/signin', {
      email,
      password,
    });
    
    // Extrai o token da resposta, tratando diferentes formatos
    let token = null;
    if (typeof response.data === 'string') {
      token = response.data;
    } else if (response.data?.token) {
      token = response.data.token;
    } else if (response.data?.accessToken) {
      token = response.data.accessToken;
    }
    
    // Garante que o token seja uma string antes de salvar
    if (token && typeof token === 'string') {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    }
    
    return response.data;
  },

  // Logout
  signout: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  // Obter token salvo
  getToken: async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  // Verificar se está autenticado
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  },
};

export default authService;

