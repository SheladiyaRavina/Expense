import React, { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseFilters from '../components/ExpenseFilters';

const ExpenseListPage = () => {
  // Dummy data for expenses (in a real app, this would come from a state management solution or API)
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2023-05-01', description: 'Groceries', category: 'Food', amount: 75.50, paymentMethod: 'credit' },
    { id: 2, date: '2023-05-03', description: 'Gas', category: 'Transportation', amount: 45.00, paymentMethod: 'credit' },
    { id: 3, date: '2023-05-05', description: 'Movie tickets', category: 'Entertainment', amount: 30.00, paymentMethod: 'cash' },
    { id: 4, date: '2023-05-07', description: 'Dinner out', category: 'Food', amount: 60.75, paymentMethod: 'credit' },
    { id: 5, date: '2023-05-10', description: 'Electric bill', category: 'Utilities', amount: 85.20, paymentMethod: 'credit' },
    { id: 6, date: '2023-05-12', description: 'Gym membership', category: 'Health', amount: 50.00, paymentMethod: 'credit' },
    { id: 7, date: '2023-05-15', description: 'New shoes', category: 'Clothing', amount: 89.99, paymentMethod: 'credit' },
    { id: 8, date: '2023-05-18', description: 'Books', category: 'Education', amount: 42.50, paymentMethod: 'cash' },
    { id: 9, date: '2023-05-20', description: 'Phone bill', category: 'Utilities', amount: 65.00, paymentMethod: 'credit' },
    { id: 10, date: '2023-05-23', description: 'Coffee', category: 'Food', amount: 4.50, paymentMethod: 'cash' },
  ]);

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    category: '',
    paymentMethod: '',
    minAmount: '',
    maxAmount: '',
  });

  const categories = [...new Set(expenses.map(expense => expense.category))];
  const paymentMethods = [...new Set(expenses.map(expense => expense.paymentMethod))];

  const updateExpense = (id, updatedFields) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, ...updatedFields } : expense
    ));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Expense List</h1>
      
      <ExpenseFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        paymentMethods={paymentMethods}
      />
      
      <ExpenseList 
        expenses={expenses} 
        updateExpense={updateExpense} 
        deleteExpense={deleteExpense}
      />
    </div>
  );
};

export default ExpenseListPage;