/**
 * Função helper para navegar para a tela de favoritos.
 * Verifica se já está na tela de favoritos antes de navegar.
 * @param {object} navigation - Objeto de navegação do React Navigation.
 */
export const navigateToFavorites = (navigation) => {
  // Obtém o nome da rota atual
  const currentRoute = navigation.getState()?.routes[navigation.getState()?.index]?.name;
  
  // Se já estiver na tela de favoritos, não navega
  if (currentRoute === "Favorites") {
    return;
  }
  
  // Navega para a tela de favoritos
  navigation.navigate("Favorites");
};

