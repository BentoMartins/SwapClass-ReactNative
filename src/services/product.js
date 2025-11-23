import api from './api';
import authService from './auth';

/**
 * Serviço para gerenciar operações relacionadas a produtos
 */
const productService = {
  /**
   * Busca produtos paginados por moeda
   * @param {string} currency - Moeda para buscar produtos (BRL, USD, EUR)
   * @param {number} page - Número da página (padrão: 0)
   * @param {number} size - Tamanho da página (padrão: 20)
   * @returns {Promise<Object>} Dados paginados dos produtos
   */
  getProducts: async (currency = 'BRL', page = 0, size = 20) => {
    try {
      const token = await authService.getToken();
      const response = await api.get(`products/${currency}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          size,
          page,
        },
      });
      return response.data.content || response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
    }
  },

  /**
   * Busca um produto por ID e moeda
   * @param {string|number} id - ID do produto
   * @param {string} targetCurrency - Moeda alvo para conversão
   * @returns {Promise<Object>} Dados do produto
   */
  getProductById: async (id, targetCurrency = 'BRL') => {
    try {
      const response = await api.get(`/products/${id}/${targetCurrency}`);
      return {
        product: response.data,
        error: null,
      };
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return {
        product: null,
        error: error.response?.data?.message || 'Erro ao buscar o produto',
      };
    }
  },

  /**
   * Converte o preço de um produto para uma moeda específica
   * @param {string|number} id - ID do produto
   * @param {string} targetCurrency - Moeda alvo para conversão (BRL, USD, EUR)
   * @returns {Promise<Object>} Objeto com convertedPrice
   */
  convertProductPrice: async (id, targetCurrency) => {
    try {
      const response = await api.get(`/products/${id}/${targetCurrency}`);
      return {
        convertedPrice: response.data?.convertedPrice || response.data?.price,
        currency: targetCurrency,
        error: null,
      };
    } catch (error) {
      console.error('Erro ao converter preço do produto:', error);
      return {
        convertedPrice: null,
        currency: targetCurrency,
        error: error.response?.data?.message || 'Erro ao converter preço',
      };
    }
  },

  /**
   * Busca produtos por termo de pesquisa
   * @param {string} searchInput - Termo de busca
   * @param {string} currency - Moeda para buscar produtos
   * @returns {Promise<Array>} Lista de produtos encontrados
   */
  searchProducts: async (searchInput, currency = 'BRL') => {
    try {
      const response = await api.get(`products/search/${searchInput}/${currency}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
    }
  },

  /**
   * Cria um novo produto
   * @param {Object} productData - Dados do produto a ser criado
   * @param {string} productData.brand - Marca do produto
   * @param {string} productData.model - Modelo do produto
   * @param {string} productData.description - Descrição do produto
   * @param {string} productData.currency - Moeda do preço (BRL, USD, EUR)
   * @param {number} productData.price - Preço do produto
   * @param {string} productData.imageUrl - URL da imagem do produto
   * @returns {Promise<Object>} Produto criado
   */
  createProduct: async (productData) => {
    try {
      const token = await authService.getToken();
      
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await api.post('/ws/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        product: response.data,
        error: null,
      };
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return {
        product: null,
        error: error.response?.data?.message || error.message || 'Erro ao criar produto',
      };
    }
  },

  /**
   * Atualiza um produto existente
   * @param {string|number} id - ID do produto
   * @param {Object} productData - Dados atualizados do produto
   * @returns {Promise<Object>} Produto atualizado
   */
  updateProduct: async (id, productData) => {
    try {
      const token = await authService.getToken();
      
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await api.put(`/ws/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        product: response.data,
        error: null,
      };
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return {
        product: null,
        error: error.response?.data?.message || error.message || 'Erro ao atualizar produto',
      };
    }
  },

  /**
   * Deleta um produto
   * @param {string|number} id - ID do produto
   * @returns {Promise<Object>} Resultado da operação
   */
  deleteProduct: async (id) => {
    try {
      const token = await authService.getToken();
      
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await api.delete(`/ws/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao deletar produto',
      };
    }
  },
};

export default productService;

