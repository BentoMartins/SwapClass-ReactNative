import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/auth';

const AuthContext = createContext({});
const USER_DATA_KEY = '@user_data';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      // Carrega dados do usuário se estiver autenticado
      if (authenticated) {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, phone) => {
    try {
      const data = await authService.signup(name, email, password, phone);
      
      // Armazena dados do usuário
      const userData = {
        name: name,
        email: email,
        phone: phone,
        ...(data?.user || data || {}), // Se a API retornar dados adicionais do usuário
      };
      
      setUser(userData);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setIsAuthenticated(true);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao criar conta',
      };
    }
  };

  const signin = async (email, password) => {
    try {
      const data = await authService.signin(email, password);
      
      // Armazena dados do usuário
      // Se a API retornar dados do usuário, usa eles
      // Caso contrário, tenta buscar do AsyncStorage ou usa valores padrão
      let userData;
      
      if (data?.user) {
        userData = data.user;
      } else if (data?.name && data?.email) {
        userData = { 
          name: data.name, 
          email: data.email,
          phone: data.phone || null,
        };
      } else {
        // Tenta buscar dados salvos anteriormente
        const savedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
        if (savedUserData) {
          userData = JSON.parse(savedUserData);
          // Atualiza o email caso tenha mudado
          userData.email = email;
        } else {
          // Fallback: usa email como nome temporário
          userData = {
            name: email.split('@')[0],
            email: email,
            phone: null,
          };
        }
      }
      
      setUser(userData);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setIsAuthenticated(true);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao fazer login',
      };
    }
  };

  const signout = async () => {
    try {
      await authService.signout();
      await AsyncStorage.removeItem(USER_DATA_KEY);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;

