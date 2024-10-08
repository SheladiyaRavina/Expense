import { useState, useEffect } from 'react';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(storedExpenses);
  }, []);

  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, { ...newExpense, id: Date.now() }];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const updateExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};

export default useExpenses;