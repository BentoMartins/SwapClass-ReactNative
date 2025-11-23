/**
 * Serviço para upload de imagens para o Cloudinary
 * Baseado no ImageService do projeto ByteBox-FrontEnd
 */

// Configurações do Cloudinary
// TODO: Mover para variáveis de ambiente em produção
const CLOUDINARY_CONFIG = {
  cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dwaj9vcic',
  uploadPreset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'imageService',
};

// URL da API do Cloudinary
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

/**
 * Faz upload de uma imagem para o Cloudinary
 * @param {Object} image - Objeto da imagem com propriedade base64
 * @param {string} image.base64 - String base64 da imagem
 * @returns {Promise<Object>} Objeto com imageUrl ou error
 */
export async function uploadImage(image) {
  // Valida se a imagem tem base64
  if (!image || !image.base64) {
    return {
      imageUrl: null,
      error: 'Imagem não possui dados base64',
    };
  }

  // Remove o prefixo se já existir (caso o ImagePicker retorne com prefixo)
  let base64Data = image.base64;
  if (base64Data.includes(',')) {
    base64Data = base64Data.split(',')[1];
  }

  const data = new FormData();
  // Formato correto para Cloudinary: data:image/[tipo];base64,[dados]
  data.append('file', `data:image/jpg;base64,${base64Data}`);
  data.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  try {
    // Usa fetch ao invés de axios para melhor compatibilidade com FormData no React Native
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        // Não definir Content-Type - o fetch define automaticamente com boundary
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `Erro HTTP: ${response.status}`;
      console.error('Erro Cloudinary:', errorData);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Upload Cloudinary sucesso:', result);

    return {
      imageUrl: result.secure_url || result.url,
      error: null,
    };
  } catch (error) {
    console.error('Erro ao fazer upload para Cloudinary:', error);
    console.error('Mensagem de erro:', error.message);
    
    return {
      imageUrl: null,
      error: error.message || 'Erro ao fazer upload da imagem',
    };
  }
}

/**
 * Faz upload de múltiplas imagens para o Cloudinary
 * @param {Array<Object>} images - Array de objetos de imagem com propriedade base64
 * @returns {Promise<Object>} Objeto com imageUrls (array) ou errors
 */
export async function uploadMultipleImages(images) {
  try {
    const uploadPromises = images.map(image => uploadImage(image));
    const results = await Promise.all(uploadPromises);

    const imageUrls = results
      .filter(result => result.imageUrl)
      .map(result => result.imageUrl);

    const errors = results
      .filter(result => result.error)
      .map(result => result.error);

    return {
      imageUrls,
      errors: errors.length > 0 ? errors : null,
      success: errors.length === 0,
    };
  } catch (error) {
    console.error('Erro ao fazer upload múltiplo para Cloudinary:', error);
    return {
      imageUrls: [],
      errors: [error.message || 'Erro ao fazer upload das imagens'],
      success: false,
    };
  }
}

/**
 * Serviço exportado como objeto (compatibilidade)
 */
const cloudinaryService = {
  uploadImage,
  uploadMultipleImages,
};

export default cloudinaryService;

