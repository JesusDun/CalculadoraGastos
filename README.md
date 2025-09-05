# Calculadora de Gastos Personales

Una aplicación web moderna para controlar gastos personales con gráficos interactivos, desarrollada con React.

## Características

- ✅ **Agregar gastos** con descripción, monto, categoría y fecha
- ✅ **Eliminar gastos** individualmente
- ✅ **Visualización en tiempo real** de estadísticas
- ✅ **Gráficos interactivos** (pastel y barras)
- ✅ **Categorización** por tipo de gasto (7 categorías)
- ✅ **Historial completo** de transacciones
- ✅ **Diseño responsive** para móviles y desktop
- ✅ **Validación de formularios**
- ✅ **Formateo de moneda** en pesos mexicanos

## Tecnologías Utilizadas

### Lenguajes
- **JavaScript** - Lógica de la aplicación
- **JSX** - Sintaxis de React
- **CSS** - Estilos y diseño
- **HTML** - Estructura base

### Frameworks y Librerías
- **React 18** - Framework principal
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos modernos
- **Tailwind CSS** - Framework de estilos

## 📁 Estructura del Proyecto

```
calculadora-gastos/
├── public/
│   ├── index.html                     # Archivo HTML base
│   └── favicon.ico                    # Icono de la aplicación
├── src/
│   ├── components/
│   │   └── ExpenseCalculator.jsx      # Componente principal (React/JSX)
│   ├── styles/
│   │   ├── globals.css                # Estilos globales
│   │   └── ExpenseCalculator.css      # Estilos del componente
│   ├── utils/
│   │   ├── categories.js              # Configuración de categorías
│   │   └── calculations.js            # Funciones de cálculo
│   ├── App.jsx                        # Componente raíz
│   └── index.js                       # Punto de entrada
├── package.json                       # Dependencias y scripts
└── README.md                          # Documentación
```

## Uso de la Aplicación

### Agregar un Gasto
1. Completa el formulario con:
   - **Descripción**: Qué compraste o gastaste
   - **Monto**: Cantidad gastada
   - **Categoría**: Selecciona de las 7 opciones disponibles
   - **Fecha**: Cuándo fue el gasto
2. Haz clic en "Agregar Gasto"

### Ver Estadísticas
- **Tarjetas de resumen**: Total gastado, número de registros, promedio diario
- **Gráfico de pastel**: Distribución de gastos por categoría
- **Gráfico de barras**: Gastos diarios de los últimos 7 días

### Gestionar Gastos
- **Ver historial**: Lista completa de todos los gastos
- **Eliminar gasto**: Botón de papelera junto a cada registro

## Personalización

### Agregar Nuevas Categorías
Editar el archivo `src/utils/categories.js`:

```javascript
export const categories = [
  // Categorías existentes...
  { 
    value: 'nueva_categoria', 
    label: 'Nueva Categoría', 
    color: '#FF5733',
    icon: '🆕' 
  }
];
```

### Modificar Estilos
- **Estilos globales**: `src/styles/globals.css`
- **Estilos del componente**: `src/styles/ExpenseCalculator.css`
- **Tailwind**: Clases en los archivos JSX

## Funciones Utilitarias

### Cálculos (`src/utils/calculations.js`)
- `calculateTotal()` - Suma total de gastos
- `groupByCategory()` - Agrupa por categoría
- `groupByDay()` - Agrupa por día
- `calculateDailyAverage()` - Promedio diario
- `formatCurrency()` - Formato de moneda
- `validateExpense()` - Validación de formularios

### Categorías (`src/utils/categories.js`)
- `categories` - Array de categorías disponibles
- `getCategoryInfo()` - Obtener info de categoría
- `getCategoryColor()` - Obtener color
- `getCategoryLabel()` - Obtener etiqueta

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## Autor

Desarrollado por Jesus Garcia, como proyecto educativo para aprender React y desarrollo web moderno.

---

¡Gracias por usar la Calculadora de Gastos Personales!
