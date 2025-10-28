import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

export default function UserProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />
      
      {/* Header com fundo roxo */}
      <View style={styles.header} />
      
      {/* Card branco com informações do usuário - posicionado entre header e conteúdo */}
      <View style={styles.userCard}>
        {/* Elemento decorativo no canto superior direito */}
        <View style={styles.decorativeElement}>
          <Image source={require('../../assets/estrelaRosa-icon.png')} style={styles.decorativeIcon} />
        </View>
        
        {/* Conteúdo horizontal */}
        <View style={styles.userContent}>
          {/* Avatar à esquerda */}
          <View style={styles.avatar}>
            <Image 
              source={require('../../assets/user-icon.png')} 
              style={styles.avatarIcon} 
            />
          </View>
          
          {/* Informações do usuário à direita */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>NOME DO USUÁRIO</Text>
            <Text style={styles.userEmail}>E-mail do usuário</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Seção Minha conta */}
        <Text style={styles.sectionTitle}>Minha conta</Text>
        <View style={styles.optionsCard}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                <Image 
                  source={require('../../assets/meusDados-icon.png')} 
                  style={styles.optionIcon} 
                />
              </View>
              <Text style={styles.optionText}>Editar meus dados</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                <Image 
                  source={require('../../assets/coracao-icon.png')} 
                  style={styles.optionIcon} 
                />
              </View>
              <Text style={styles.optionText}>Meus favoritos</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                <Image 
                  source={require('../../assets/meusAnuncios-icon.png')} 
                  style={styles.optionIcon} 
                />
              </View>
              <Text style={styles.optionText}>Meus anúncios</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Seção Serviços */}
        <Text style={styles.sectionTitle}>Serviços</Text>
        <View style={styles.optionsCard}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                <Image 
                  source={require('../../assets/suporte-icon.png')} 
                  style={styles.optionIcon} 
                />
              </View>
              <Text style={styles.optionText}>Contate o suporte</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Botão Sair da Conta */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.logoutText}>SAIR DA CONTA</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/casa-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <Image source={require('../../assets/lupa-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sell')}>
          <Image source={require('../../assets/publicar-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/contaPreenchida-icon.png')} style={styles.navIconActive} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#3C1342',
    height: 140,
  },
  userCard: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
  },
  decorativeElement: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 50,
    height: 30,
    backgroundColor: '#FF007A',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: '#FF007A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 15,
  },
  avatarIcon: {
    width: 35,
  
    height: 35,
    tintColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 1,
    textAlign: 'left',
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'left',
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    paddingTop: -100,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    marginTop: 5,
  },
  optionsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    marginBottom: 5,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 23,
    height: 21,
    marginRight: 15,
    tintColor: '#FF007A',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  arrowIcon: {
    width: 15,
    height: 10,
    tintColor: '#FF007A',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    borderWidth: 2,
    borderColor: '#000000',
    borderLeftWidth: 6,
    borderBottomWidth: 6,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3C1342',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 60,
  },
  navIcon: {
    width: 27,
    height: 26,
    tintColor: '#FFFFFF',
  },
  navIconActive: {
    width: 24,
    height: 24,
  },
});

