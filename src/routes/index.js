import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../pages/WelcomeScreen';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import SuccessScreen from '../pages/SuccessScreen';
import HomeScreen from '../pages/HomeScreen';
import CategoryScreen from '../pages/CategoryScreen';
import InfoScreen from '../pages/InfoScreen';
import ProductDetailScreen from '../pages/ProductDetailScreen';
import ForgotPasswordScreen from '../pages/ForgotPasswordScreen';
import SellScreen from '../pages/SellScreen';
import UserProfileScreen from '../pages/UserProfileScreen';
import MyAdsScreen from '../pages/MyAdsScreen';
import FavoritesScreen from '../pages/FavoritesScreen';
import FAQScreen from '../pages/FAQScreen';
import SupportScreen from '../pages/SupportScreen';
import EditDataScreen from '../pages/EditDataScreen';
import PersonalDetailsScreen from '../pages/PersonalDetailsScreen';
import PhoneNumbersScreen from '../pages/PhoneNumbersScreen';
import PasswordSecurityScreen from '../pages/PasswordSecurityScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }} // Esconde o header na tela de boas-vindas
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }} // Esconde o header na tela de login
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: false }} // Esconde o header na tela de registro
        />
        <Stack.Screen 
          name="Success" 
          component={SuccessScreen}
          options={{ headerShown: false }} // Esconde o header na tela de sucesso
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen}
          options={{ headerShown: false }} // Esconde o header na tela de recuperação de senha
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Category" 
          component={CategoryScreen}
          options={{ headerShown: false }}
        />

        {/* Tela Info */}
        <Stack.Screen 
          name="Info" 
          component={InfoScreen}
          options={{ title: 'Informações do Grupo' }}
        />

        {/* Tela ProductDetail */}
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={{ headerShown: false }} 
        />

        {/* Tela Sell */}
        <Stack.Screen 
          name="Sell" 
          component={SellScreen}
          options={{ headerShown: false }}
        />

        {/* Tela UserProfile */}
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />

        {/* Tela MyAds */}
        <Stack.Screen 
          name="MyAds" 
          component={MyAdsScreen}
          options={{ headerShown: false }}
        />

        {/* Tela Favorites */}
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen}
          options={{ headerShown: false }}
        />

        {/* Tela FAQ */}
        <Stack.Screen 
          name="FAQ" 
          component={FAQScreen}
          options={{ headerShown: false }}
        />

        {/* Tela Support */}
        <Stack.Screen 
          name="Support" 
          component={SupportScreen}
          options={{ headerShown: false }}
        />

        {/* Tela EditData */}
        <Stack.Screen 
          name="EditData" 
          component={EditDataScreen}
          options={{ headerShown: false }}
        />

        {/* Tela PersonalDetails */}
        <Stack.Screen 
          name="PersonalDetails" 
          component={PersonalDetailsScreen}
          options={{ headerShown: false }}
        />

        {/* Tela PhoneNumbers */}
        <Stack.Screen 
          name="PhoneNumbers" 
          component={PhoneNumbersScreen}
          options={{ headerShown: false }}
        />

        {/* Tela PasswordSecurity */}
        <Stack.Screen 
          name="PasswordSecurity" 
          component={PasswordSecurityScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    color: '#007bff',
    fontSize: 16,
    marginHorizontal: 10,
  }
});

