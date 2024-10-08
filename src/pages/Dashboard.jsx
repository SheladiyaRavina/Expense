// src/pages/Dashboard.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ExpenseCharts from '../components/Charts/ExpenseCharts';
import ExpenseFilters from '../components/ExpenseFilters';
import { useExpenses } from '../context/ExpenseContext';

const Dashboard = () => {
  const { expenses } = useExpenses();

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

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        (!filters.startDate || expenseDate >= filters.startDate) &&
        (!filters.endDate || expenseDate <= filters.endDate) &&
        (!filters.category || expense.category === filters.category) &&
        (!filters.paymentMethod || expense.paymentMethod === filters.paymentMethod) &&
        (!filters.minAmount || Number(expense.amount) >= Number(filters.minAmount)) &&
        (!filters.maxAmount || Number(expense.amount) <= Number(filters.maxAmount))
      );
    });
  }, [expenses, filters]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <ExpenseFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        paymentMethods={paymentMethods}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Expenses</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.slice(0, 5).map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${Number(expense.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Link to="/expenses" className="text-indigo-600 hover:text-indigo-900">View all expenses</Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Expense Analytics</h2>
          <ExpenseCharts expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;