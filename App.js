import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/contexts/AuthContext';
import { CurrencyProvider } from './src/contexts/CurrencyContext';
import MainNavigator from './src/routes/index.js';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CurrencyProvider>
          <MainNavigator />
          <StatusBar style="auto" />
        </CurrencyProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
