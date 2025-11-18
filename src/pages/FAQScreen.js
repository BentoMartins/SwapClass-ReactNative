import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";

// Componentes
import AppHeader from "../components/AppHeader";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingTop: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_LARGE,
  },
  sectionTitle: {
    fontSize: RESPONSIVE.SUBTITLE,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: RESPONSIVE.BORDER_RADIUS_MEDIUM,
    marginBottom: RESPONSIVE.MARGIN_SMALL,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: RESPONSIVE.PADDING_MEDIUM,
  },
  questionText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    marginRight: RESPONSIVE.MARGIN_SMALL,
  },
  chevronIcon: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#FF007A",
  },
  faqAnswer: {
    paddingHorizontal: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_MEDIUM,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  answerText: {
    fontSize: RESPONSIVE.BODY_MEDIUM,
    color: "#666",
    lineHeight: RESPONSIVE.BODY_MEDIUM * 1.5,
  },
});

// Dados de perguntas frequentes
const faqData = [
  {
    id: 1,
    question: "Como faço para publicar um anúncio?",
    answer:
      "Para publicar um anúncio, acesse a aba 'Publicar' na barra de navegação inferior. Preencha todas as informações solicitadas, adicione fotos do produto e clique em 'Publicar'. Seu anúncio será revisado e estará disponível em breve.",
  },
  {
    id: 2,
    question: "Como entro em contato com o vendedor?",
    answer:
      "Você pode entrar em contato com o vendedor clicando no botão 'Mandar mensagem para o vendedor!' na página de detalhes do produto. Isso abrirá o WhatsApp com uma mensagem pré-formatada.",
  },
  {
    id: 3,
    question: "Como adiciono um produto aos favoritos?",
    answer:
      "Para adicionar um produto aos favoritos, clique no ícone de coração que aparece nos cards de produtos ou na página de detalhes. Você pode visualizar todos os seus favoritos na seção 'Meus favoritos' do seu perfil.",
  },
  {
    id: 4,
    question: "Posso editar ou remover meu anúncio?",
    answer:
      "Sim! Acesse 'Meus anúncios' no seu perfil para ver todos os seus anúncios publicados. Lá você poderá editar as informações ou remover o anúncio quando desejar.",
  },
  {
    id: 5,
    question: "Como funciona a busca de produtos?",
    answer:
      "Use a barra de busca na tela de categorias para pesquisar produtos por nome ou descrição. Você também pode navegar pelas categorias disponíveis para encontrar produtos específicos.",
  },
  {
    id: 6,
    question: "O aplicativo é gratuito?",
    answer:
      "Sim! O SwapClass é totalmente gratuito para publicar anúncios e buscar produtos. Não cobramos taxas ou comissões pelas transações realizadas.",
  },
  {
    id: 7,
    question: "Como faço para sair da minha conta?",
    answer:
      "Para sair da sua conta, acesse o seu perfil e role até o final da página. Clique no botão vermelho 'SAIR DA CONTA' para fazer logout.",
  },
];

export default function FAQScreen({ navigation }) {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header com botão de voltar */}
      <AppHeader title="SwapClass" onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Título da seção */}
        <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>

        {/* Lista de perguntas e respostas */}
        {faqData.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          return (
            <View key={item.id} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.chevronIcon}>
                  {isExpanded ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

