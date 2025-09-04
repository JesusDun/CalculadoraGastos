import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, DollarSign, TrendingDown, TrendingUp, Calculator } from 'lucide-react';

// Importar utilidades
import { categories, getCategoryColor, getCategoryLabel } from '../utils/categories';
import { 
  calculateTotal, 
  groupByCategory, 
  groupByDay, 
  calculateDailyAverage,
  formatCurrency,
  validateExpense 
} from '../utils/calculations';

const ExpenseCalculator = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'comida',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  // Agregar nuevo gasto
  const addExpense = () => {
    const validation = validateExpense(newExpense);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };
    
    setExpenses([...expenses, expense]);
    setNewExpense({
      description: '',
      amount: '',
      category: 'comida',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  // Eliminar gasto
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Cálculos usando las funciones utilitarias
  const totalAmount = calculateTotal(expenses);
  const categoryData = groupByCategory(expenses, categories);
  const chartData = groupByDay(expenses, 7);
  const dailyAverage = calculateDailyAverage(expenses, chartData);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Calculadora de Gastos</h1>
          </div>
          <p className="text-gray-600">Controla tus finanzas personales de manera visual</p>
        </div>

        {/* Resumen */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 summary-grid">
          <div className="summary-card green">
            <div className="flex items-center gap-3 text-white">
              <DollarSign className="w-8 h-8" />
              <div>
                <p className="text-green-100">Total Gastado</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
          
          <div className="summary-card blue">
            <div className="flex items-center gap-3 text-white">
              <TrendingUp className="w-8 h-8" />
              <div>
                <p className="text-blue-100">Total Registros</p>
                <p className="text-2xl font-bold">{expenses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="summary-card purple">
            <div className="flex items-center gap-3 text-white">
              <TrendingDown className="w-8 h-8" />
              <div>
                <p className="text-purple-100">Promedio por Día</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(dailyAverage)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="expense-form">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Agregar Nuevo Gasto
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4 form-grid">
            <div>
              <input
                type="text"
                placeholder="Descripción del gasto"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                className={`form-input ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <div>
              <input
                type="number"
                placeholder="Monto"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                className={`form-input ${errors.amount ? 'border-red-500' : ''}`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
            
            <div>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="form-input form-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                className="form-input"
              />
            </div>
          </div>
          
          <button onClick={addExpense} className="add-button mt-4">
            <Plus className="w-5 h-5" />
            Agregar Gasto
          </button>
        </div>

        {/* Gráficos */}
        {expenses.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8 chart-grid">
            <div className="chart-container">
              <h3 className="chart-title">Gastos por Categoría</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Monto']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3 className="chart-title">Gastos Diarios (Últimos 7 días)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Monto']} />
                  <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Lista de gastos */}
        {expenses.length > 0 && (
          <div className="expense-list">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Historial de Gastos</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className="category-indicator"
                      style={{ backgroundColor: getCategoryColor(expense.category) }}
                    ></div>
                    <div className="expense-info">
                      <p className="expense-description">{expense.description}</p>
                      <p className="expense-meta">
                        {getCategoryLabel(expense.category)} • {new Date(expense.date).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="delete-button"
                      title="Eliminar gasto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {expenses.length === 0 && (
          <div className="empty-state">
            <Calculator className="empty-state-icon" />
            <p className="text-xl text-gray-500 mb-2">No hay gastos registrados</p>
            <p className="text-gray-400">Agrega tu primer gasto para comenzar a ver las estadísticas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCalculator;
