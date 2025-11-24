import api from './api';
import authService from './auth';

/**
 * Serviço para gerenciar produtos favoritados usando a API do backend
 */
const favoritesService = {
  /**
   * Busca todos os produtos favoritados do usuário
   * @returns {Promise<Array>} Lista de produtos favoritados
   */
  getFavorites: async () => {
    try {
      const token = await authService.getToken();
      if (!token) {
        return [];
      }

      const response = await api.get('/ws/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data || [];
    } catch (error) {
      // Se for 404, significa que o endpoint não existe (serviço não iniciado)
      if (error.response?.status === 404) {
        console.warn('Endpoint de favoritos não encontrado. Verifique se o serviço está rodando.');
        return [];
      }
      console.error('Erro ao buscar favoritos:', error);
      return [];
    }
  },

  /**
   * Verifica se um produto está favoritado
   * @param {string|number} productId - ID do produto
   * @returns {Promise<boolean>} true se o produto está favoritado
   */
  isFavorite: async (productId) => {
    try {
      const token = await authService.getToken();
      if (!token) {
        return false;
      }

      const response = await api.get(`/ws/favorites/${productId}/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data === true;
    } catch (error) {
      // Se for 404, significa que o endpoint não existe (serviço não iniciado)
      // Retorna false silenciosamente para não quebrar a aplicação
      if (error.response?.status === 404) {
        console.warn('Endpoint de favoritos não encontrado. Verifique se o serviço está rodando.');
        return false;
      }
      console.error('Erro ao verificar favorito:', error);
      return false;
    }
  },

  /**
   * Adiciona um produto aos favoritos
   * @param {string|number} productId - ID do produto a ser favoritado
   * @returns {Promise<boolean>} true se o produto foi adicionado com sucesso
   */
  addFavorite: async (productId) => {
    try {
      const token = await authService.getToken();
      if (!token) {
        return false;
      }

      const response = await api.post(
        `/ws/favorites/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.status === 201;
    } catch (error) {
      // Se for 404, significa que o endpoint não existe (serviço não iniciado)
      if (error.response?.status === 404) {
        console.warn('Endpoint de favoritos não encontrado. Verifique se o serviço está rodando.');
        return false;
      }
      // Se já está favoritado (409), retorna true
      if (error.response?.status === 409) {
        return true;
      }
      console.error('Erro ao adicionar favorito:', error);
      return false;
    }
  },

  /**
   * Remove um produto dos favoritos
   * @param {string|number} productId - ID do produto a ser removido
   * @returns {Promise<boolean>} true se o produto foi removido com sucesso
   */
  removeFavorite: async (productId) => {
    try {
      const token = await authService.getToken();
      if (!token) {
        return false;
      }

      const response = await api.delete(`/ws/favorites/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.status === 204;
    } catch (error) {
      // Se for 404, pode ser que o endpoint não existe ou o favorito já foi removido
      if (error.response?.status === 404) {
        // Se for 404 do endpoint, avisa; se for do recurso, considera sucesso (já removido)
        if (error.response?.data) {
          console.warn('Favorito não encontrado (pode já ter sido removido)');
          return true; // Considera sucesso se já foi removido
        } else {
          console.warn('Endpoint de favoritos não encontrado. Verifique se o serviço está rodando.');
          return false;
        }
      }
      console.error('Erro ao remover favorito:', error);
      return false;
    }
  },

  /**
   * Alterna o estado de favorito de um produto
   * Se estiver favoritado, remove; se não estiver, adiciona
   * @param {string|number} productId - ID do produto
   * @returns {Promise<boolean>} true se foi adicionado, false se foi removido
   */
  toggleFavorite: async (productId) => {
    try {
      // Verifica o estado atual
      const isFav = await favoritesService.isFavorite(productId);
      
      if (isFav) {
        // Se está favoritado, remove
        const removed = await favoritesService.removeFavorite(productId);
        if (removed) {
          return false; // Retorna false indicando que foi removido
        }
        // Se não conseguiu remover, mantém o estado atual
        return true;
      } else {
        // Se não está favoritado, adiciona
        const added = await favoritesService.addFavorite(productId);
        if (added) {
          return true; // Retorna true indicando que foi adicionado
        }
        // Se não conseguiu adicionar, mantém o estado atual
        return false;
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      // Em caso de erro, tenta verificar o estado atual
      try {
        return await favoritesService.isFavorite(productId);
      } catch {
        return false;
      }
    }
  },
};

export default favoritesService;

