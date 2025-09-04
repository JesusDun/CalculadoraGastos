// Configuración de categorías de gastos
export const categories = [
  { 
    value: 'comida', 
    label: 'Comida', 
    color: '#FF6B6B',
    icon: '🍽️' 
  },
  { 
    value: 'transporte', 
    label: 'Transporte', 
    color: '#4ECDC4',
    icon: '🚗' 
  },
  { 
    value: 'entretenimiento', 
    label: 'Entretenimiento', 
    color: '#45B7D1',
    icon: '🎮' 
  },
  { 
    value: 'salud', 
    label: 'Salud', 
    color: '#96CEB4',
    icon: '🏥' 
  },
  { 
    value: 'servicios', 
    label: 'Servicios', 
    color: '#FFEAA7',
    icon: '💡' 
  },
  { 
    value: 'compras', 
    label: 'Compras', 
    color: '#DDA0DD',
    icon: '🛍️' 
  },
  { 
    value: 'otros', 
    label: 'Otros', 
    color: '#98D8C8',
    icon: '📦' 
  }
];

// Función para obtener información de una categoría
export const getCategoryInfo = (categoryValue) => {
  return categories.find(cat => cat.value === categoryValue) || {
    value: 'otros',
    label: 'Otros',
    color: '#98D8C8',
    icon: '📦'
  };
};

// Función para obtener color de categoría
export const getCategoryColor = (categoryValue) => {
  const category = getCategoryInfo(categoryValue);
  return category.color;
};

// Función para obtener label de categoría
export const getCategoryLabel = (categoryValue) => {
  const category = getCategoryInfo(categoryValue);
  return category.label;
};
