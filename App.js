import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import MainNavigator from './src/routes/index.js';

export default function App() {
  return (
    <>
      <MainNavigator />
      <StatusBar style="auto" />
    </>
  );
}
