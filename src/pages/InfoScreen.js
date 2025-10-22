import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RESPONSIVE, isSmallScreen, isLargeScreen, isTablet } from '../utils/responsive';

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Desenvolvedores do App</Text>
        <Text style={styles.description}>
          Aplicativo desenvolvido para a disciplina de React Native.
        </Text>

        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Augusto de Oliveira Godoy</Text>
          <Text style={styles.memberRA}>RA: 1136630</Text>
        </View>

        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Bento Martins</Text>
          <Text style={styles.memberRA}>RA: 1125095</Text>
        </View>
        
        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Gabriel Portelinha Rico</Text>
          <Text style={styles.memberRA}>RA: 1136215</Text>
        </View>
        
        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Ricardo Zanandrea</Text>
          <Text style={styles.memberRA}>RA: 1136748</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: isTablet() ? RESPONSIVE.PADDING_XL : RESPONSIVE.PADDING_MEDIUM,
  },
  headerTitle: {
    fontSize: isSmallScreen() ? RESPONSIVE.HEADER : isTablet() ? RESPONSIVE.HEADER * 1.2 : RESPONSIVE.HEADER,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: RESPONSIVE.MARGIN_SMALL,
  },
  description: {
    fontSize: isSmallScreen() ? RESPONSIVE.BODY_MEDIUM : isTablet() ? RESPONSIVE.BODY_LARGE : RESPONSIVE.BODY_MEDIUM,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: isTablet() ? RESPONSIVE.MARGIN_XL : RESPONSIVE.MARGIN_XL,
    lineHeight: isTablet() ? 28 : 24,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#000',
    borderBottomColor: '#000',
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    padding: isTablet() ? RESPONSIVE.PADDING_LARGE : RESPONSIVE.PADDING_SMALL,
    marginBottom: RESPONSIVE.MARGIN_SMALL,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    minHeight: isTablet() ? 100 : 80,
    justifyContent: 'center',
  },
  memberName: {
    fontSize: isSmallScreen() ? RESPONSIVE.BODY_LARGE : isTablet() ? RESPONSIVE.BODY_LARGE * 1.1 : RESPONSIVE.BODY_LARGE,
    fontWeight: '600',
    textAlign: 'center',
  },
  memberRA: {
    fontSize: isSmallScreen() ? RESPONSIVE.BODY_MEDIUM : isTablet() ? RESPONSIVE.BODY_MEDIUM * 1.1 : RESPONSIVE.BODY_MEDIUM,
    color: '#6c757d',
    marginTop: RESPONSIVE.PADDING_XS,
    textAlign: 'center',
  },
});

