// Funciones para cálculos de gastos

// Calcular total de gastos
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Agrupar gastos por categoría
export const groupByCategory = (expenses, categories) => {
  return categories.map(cat => {
    const amount = expenses
      .filter(exp => exp.category === cat.value)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      name: cat.label,
      value: amount,
      color: cat.color
    };
  }).filter(item => item.value > 0);
};

// Agrupar gastos por día
export const groupByDay = (expenses, days = 7) => {
  const dailyData = expenses.reduce((acc, exp) => {
    const date = exp.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += exp.amount;
    return acc;
  }, {});

  return Object.keys(dailyData)
    .sort()
    .slice(-days) // Últimos N días
    .map(date => ({
      date: new Date(date).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      }),
      amount: dailyData[date],
      fullDate: date
    }));
};

// Calcular promedio por día
export const calculateDailyAverage = (expenses, chartData) => {
  if (chartData.length === 0) return 0;
  const total = calculateTotal(expenses);
  return total / chartData.length;
};

// Encontrar el gasto más alto
export const getHighestExpense = (expenses) => {
  if (expenses.length === 0) return null;
  return expenses.reduce((max, expense) => 
    expense.amount > max.amount ? expense : max
  );
};

// Encontrar la categoría con más gastos
export const getTopCategory = (categoryData) => {
  if (categoryData.length === 0) return null;
  return categoryData.reduce((max, category) => 
    category.value > max.value ? category : max
  );
};

// Formatear moneda
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};

// Validar entrada de gasto
export const validateExpense = (expense) => {
  const errors = {};
  
  if (!expense.description || expense.description.trim() === '') {
    errors.description = 'La descripción es requerida';
  }
  
  if (!expense.amount || parseFloat(expense.amount) <= 0) {
    errors.amount = 'El monto debe ser mayor a 0';
  }
  
  if (!expense.category) {
    errors.category = 'La categoría es requerida';
  }
  
  if (!expense.date) {
    errors.date = 'La fecha es requerida';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
