// Categorias disponíveis
export const CATEGORIES = [
  { id: 1, name: "Móveis e artigos de decoração", value: "MOVIES" },
  { id: 2, name: "Eletrônicos", value: "ELECTRONICS" },
  { id: 3, name: "Roupas e acessórios", value: "CLOTHES" },
  { id: 4, name: "Tênis", value: "SNEAKERS" },
  { id: 5, name: "Livros e revistas", value: "BOOKS" },
  { id: 6, name: "Outros", value: "OTHERS" },
];

// Condições disponíveis
export const CONDITIONS = [
  { id: 1, name: "Novo - Nunca usado", value: "NEW" },
  { id: 2, name: "Usado - Condição de novo", value: "LIKE_NEW" },
  { id: 3, name: "Usado - Bom estado", value: "GOOD" },
  { id: 4, name: "Usado - Mal estado", value: "POOR" },
];

// Função auxiliar para obter nome da categoria pelo valor
export const getCategoryName = (value) => {
  const category = CATEGORIES.find((cat) => cat.value === value);
  return category ? category.name : "Categoria não encontrada";
};

// Função auxiliar para obter nome da condição pelo valor
export const getConditionName = (value) => {
  const condition = CONDITIONS.find((cond) => cond.value === value);
  return condition ? condition.name : "Condição não encontrada";
};

