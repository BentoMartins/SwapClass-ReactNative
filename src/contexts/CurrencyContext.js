import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

/**
 * Provider para gerenciar o estado da moeda selecionada
 * Suporta alternância entre BRL, USD e EUR
 */
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('BRL');

  /**
   * Alterna entre as moedas disponíveis: BRL -> USD -> EUR -> BRL
   */
  const changeCurrency = () => {
    setCurrency((currentCurrency) => {
      if (currentCurrency === 'BRL') {
        return 'USD';
      } else if (currentCurrency === 'USD') {
        return 'EUR';
      } else {
        return 'BRL';
      }
    });
  };

  /**
   * Define uma moeda específica
   * @param {string} newCurrency - Moeda a ser definida (BRL, USD, EUR)
   */
  const setCurrencyDirectly = (newCurrency) => {
    if (['BRL', 'USD', 'EUR'].includes(newCurrency)) {
      setCurrency(newCurrency);
    } else {
      console.warn(`Moeda inválida: ${newCurrency}. Usando BRL como padrão.`);
      setCurrency('BRL');
    }
  };

  const value = {
    currency,
    changeCurrency,
    setCurrency: setCurrencyDirectly,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de moeda
 * @returns {Object} { currency, changeCurrency, setCurrency }
 */
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency deve ser usado dentro de um CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;

