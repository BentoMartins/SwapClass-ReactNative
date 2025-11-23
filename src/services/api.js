import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração da URL base do gateway
// Para dispositivos físicos, use o IP da máquina ao invés de localhost
// Exemplo: 'http://192.168.1.100:8765'
const BASE_URL = 'http://192.168.100.17:8765';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

