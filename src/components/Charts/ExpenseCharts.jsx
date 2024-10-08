import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57', '#FFC658'];

const ExpenseCharts = ({ expenses }) => {
  const monthlyData = useMemo(() => {
    const data = {};
    expenses.forEach(expense => {
      const date = format(parseISO(expense.date), 'yyyy-MM');
      if (!data[date]) {
        data[date] = 0;
      }
      data[date] += expense.amount;
    });
    return Object.entries(data).map(([date, amount]) => ({ date, amount }));
  }, [expenses]);

  const categoryData = useMemo(() => {
    const data = {};
    expenses.forEach(expense => {
      if (!data[expense.category]) {
        data[expense.category] = 0;
      }
      data[expense.category] += expense.amount;
    });
    return Object.entries(data).map(([category, amount]) => ({ category, amount }));
  }, [expenses]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;