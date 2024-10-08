import { format, parseISO } from 'date-fns';

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

// Calculate total expenses
export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Group expenses by category
export const groupExpensesByCategory = (expenses) => {
  return expenses.reduce((grouped, expense) => {
    const category = expense.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(expense);
    return grouped;
  }, {});
};

// Calculate category totals
export const calculateCategoryTotals = (groupedExpenses) => {
  const categoryTotals = {};
  for (const [category, expenses] of Object.entries(groupedExpenses)) {
    categoryTotals[category] = expenses.reduce((total, expense) => total + expense.amount, 0);
  }
  return categoryTotals;
};

// Generate color for categories
export const generateCategoryColor = (category) => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
  ];
  const index = category.charCodeAt(0) % colors.length;
  return colors[index];
};