import { Dimensions, PixelRatio } from 'react-native';

// Obtém as dimensões da tela
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base de referência para cálculos (iPhone X/11/12/13/14)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Função para dimensionar largura baseada na largura da tela
export const scaleWidth = (size) => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

// Função para dimensionar altura baseada na altura da tela
export const scaleHeight = (size) => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

// Função para dimensionar fontes
export const scaleFont = (size) => {
  const newSize = scaleWidth(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Função para dimensionar padding/margin
export const scaleSize = (size) => {
  return scaleWidth(size);
};

// Breakpoints para diferentes tamanhos de tela
export const isSmallScreen = () => SCREEN_WIDTH < 375;
export const isMediumScreen = () => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeScreen = () => SCREEN_WIDTH >= 414;
export const isTablet = () => SCREEN_WIDTH >= 768;

// Função para obter número de colunas baseado no tamanho da tela
export const getColumns = () => {
  if (isTablet()) return 3;
  if (isLargeScreen()) return 2;
  return 2;
};

// Função para obter tamanho de fonte responsivo
export const getResponsiveFontSize = (baseSize) => {
  if (isSmallScreen()) return scaleFont(baseSize * 0.9);
  if (isLargeScreen()) return scaleFont(baseSize * 1.1);
  if (isTablet()) return scaleFont(baseSize * 1.2);
  return scaleFont(baseSize);
};

// Função para obter padding responsivo
export const getResponsivePadding = (basePadding) => {
  if (isSmallScreen()) return scaleSize(basePadding * 0.8);
  if (isLargeScreen()) return scaleSize(basePadding * 1.2);
  if (isTablet()) return scaleSize(basePadding * 1.5);
  return scaleSize(basePadding);
};

// Função para obter altura de imagem responsiva
export const getResponsiveImageHeight = (baseHeight) => {
  if (isSmallScreen()) return scaleHeight(baseHeight * 0.8);
  if (isLargeScreen()) return scaleHeight(baseHeight * 1.1);
  if (isTablet()) return scaleHeight(baseHeight * 1.3);
  return scaleHeight(baseHeight);
};

// Função para obter largura de botão responsiva
export const getResponsiveButtonWidth = (baseWidth) => {
  if (isSmallScreen()) return scaleWidth(baseWidth * 0.9);
  if (isLargeScreen()) return scaleWidth(baseWidth * 1.1);
  if (isTablet()) return scaleWidth(baseWidth * 1.2);
  return scaleWidth(baseWidth);
};

// Função para obter espaçamento entre elementos
export const getResponsiveSpacing = (baseSpacing) => {
  if (isSmallScreen()) return scaleSize(baseSpacing * 0.8);
  if (isLargeScreen()) return scaleSize(baseSpacing * 1.1);
  if (isTablet()) return scaleSize(baseSpacing * 1.3);
  return scaleSize(baseSpacing);
};

// Constantes responsivas comuns
export const RESPONSIVE = {
  // Fontes
  TITLE_LARGE: getResponsiveFontSize(40),
  TITLE_MEDIUM: getResponsiveFontSize(36),
  TITLE_SMALL: getResponsiveFontSize(32),
  HEADER: getResponsiveFontSize(26),
  SUBTITLE: getResponsiveFontSize(22),
  BODY_LARGE: getResponsiveFontSize(18),
  BODY_MEDIUM: getResponsiveFontSize(16),
  BODY_SMALL: getResponsiveFontSize(14),
  CAPTION: getResponsiveFontSize(12),
  
  // Espaçamentos
  PADDING_XL: getResponsivePadding(40),
  PADDING_LARGE: getResponsivePadding(30),
  PADDING_MEDIUM: getResponsivePadding(20),
  PADDING_SMALL: getResponsivePadding(15),
  PADDING_XS: getResponsivePadding(10),
  
  // Margens
  MARGIN_XL: getResponsiveSpacing(40),
  MARGIN_LARGE: getResponsiveSpacing(30),
  MARGIN_MEDIUM: getResponsiveSpacing(20),
  MARGIN_SMALL: getResponsiveSpacing(15),
  MARGIN_XS: getResponsiveSpacing(10),
  
  // Tamanhos de elementos
  BUTTON_HEIGHT: getResponsiveSpacing(50),
  INPUT_HEIGHT: getResponsiveSpacing(45),
  CARD_HEIGHT: getResponsiveSpacing(200),
  IMAGE_HEIGHT: getResponsiveImageHeight(300),
  
  // Bordas
  BORDER_RADIUS_SMALL: scaleSize(5),
  BORDER_RADIUS_MEDIUM: scaleSize(8),
  BORDER_RADIUS_LARGE: scaleSize(12),
  BORDER_RADIUS_XL: scaleSize(20),
  
  // Larguras
  BUTTON_WIDTH_FULL: SCREEN_WIDTH - getResponsivePadding(40),
  BUTTON_WIDTH_HALF: (SCREEN_WIDTH - getResponsivePadding(60)) / 2,
  CARD_WIDTH: (SCREEN_WIDTH - getResponsivePadding(30)) / 2,
};

export default {
  scaleWidth,
  scaleHeight,
  scaleFont,
  scaleSize,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  isTablet,
  getColumns,
  getResponsiveFontSize,
  getResponsivePadding,
  getResponsiveImageHeight,
  getResponsiveButtonWidth,
  getResponsiveSpacing,
  RESPONSIVE,
};
