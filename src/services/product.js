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
   * Busca produtos por termo de pesquisa e/ou categoria
   * @param {string} searchInput - Termo de busca (busca na brand do produto)
   * @param {string} currency - Moeda para buscar produtos
   * @param {string} category - Categoria para filtrar (opcional)
   * @returns {Promise<Array>} Lista de produtos encontrados
   */
  searchProducts: async (searchInput, currency = 'BRL', category = null) => {
    try {
      const token = await authService.getToken();
      const response = await api.get(`products/${currency}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          size: 100,
          page: 0,
        },
      });

      const allProducts = response.data.content || response.data || [];
      
      // Filtrar produtos pela brand, model, description e categoria
      const searchTerm = searchInput ? searchInput.trim().toLowerCase() : '';
      const filteredProducts = allProducts.filter((product) => {
        // Filtro por categoria (se fornecido)
        if (category && product.category !== category) {
          return false;
        }
        
        // Se não há termo de busca, retorna todos os produtos da categoria
        if (!searchTerm) {
          return true;
        }
        
        // Busca na brand, model ou description
        const brand = (product.brand || '').toLowerCase();
        const model = (product.model || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        
        return brand.includes(searchTerm) || 
               model.includes(searchTerm) || 
               description.includes(searchTerm);
      });

      return filteredProducts;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
    }
  },

  /**
   * Busca produtos por categoria
   * @param {string} category - Categoria para filtrar
   * @param {string} currency - Moeda para buscar produtos
   * @returns {Promise<Array>} Lista de produtos encontrados
   */
  getProductsByCategory: async (category, currency = 'BRL') => {
    try {
      return await productService.searchProducts('', currency, category);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos por categoria');
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

      // Garantir que o preço é um número decimal válido
      const dataToSend = {
        ...productData,
        price: typeof productData.price === 'string' 
          ? parseFloat(productData.price.replace(',', '.')) 
          : typeof productData.price === 'number'
          ? parseFloat(productData.price.toFixed(2))
          : productData.price,
      };

      // Validar campos obrigatórios
      if (!dataToSend.brand || !dataToSend.model || !dataToSend.currency || !dataToSend.price) {
        throw new Error('Campos obrigatórios faltando: brand, model, currency e price são obrigatórios');
      }

      // Validar que o preço é um número válido
      if (isNaN(dataToSend.price) || dataToSend.price <= 0) {
        throw new Error('Preço deve ser um número maior que zero');
      }

      // Log para debug (remover em produção)
      console.log('Enviando dados para API:', JSON.stringify(dataToSend, null, 2));
      console.log('Token presente:', !!token);

      const response = await api.post('/ws/products', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        product: response.data,
        error: null,
      };
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Request data:', error.config?.data);
      
      // Mensagem de erro mais detalhada
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || 'Erro ao criar produto';
      
      return {
        product: null,
        error: errorMessage,
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

