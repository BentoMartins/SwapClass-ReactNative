import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  notFoundText: {
    color: "#343a40",
    textAlign: "center",
    marginTop: 10,
  },
});

/**
 * Componente wrapper para gerenciar a renderização de estados de carregamento e erro.
 * * @param {boolean} isLoading - Se a requisição está em andamento.
 * @param {string|null} error - Mensagem de erro.
 * @param {object|null} data - O objeto de dados que está sendo carregado.
 * @param {React.Node} loadingComponent - Componente a ser exibido durante o loading (ex: ActivityIndicator).
 * @param {string} errorText - Mensagem a ser exibida em caso de erro.
 * @param {string} notFoundText - Mensagem a ser exibida se os dados forem nulos ou vazios.
 */
export default function DataLoadingState({
  isLoading,
  error,
  data,
  loadingComponent,
  errorText,
  notFoundText,
}) {
  if (isLoading) {
    return <View style={styles.centered}>{loadingComponent}</View>;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    );
  }

  // Verifica se 'data' é nulo ou vazio (por exemplo, um array vazio)
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>{notFoundText}</Text>
      </View>
    );
  }

  // Se tudo estiver OK, este componente deve retornar null
  // e o componente pai deve seguir com a renderização normal.
  return null;
}
