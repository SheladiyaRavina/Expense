import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';
import { useExpenses } from '../context/ExpenseContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Statistics = () => {
  const { expenses } = useExpenses();

  const calculateMonthlyTotals = () => {
    const totals = {};
    expenses.forEach(expense => {
      const month = format(parseISO(expense.date), 'yyyy-MM');
      totals[month] = (totals[month] || 0) + expense.amount;
    });
    return Object.entries(totals).map(([date, total]) => ({ date, total }));
  };

  const calculateCategoryTotals = () => {
    const totals = {};
    expenses.forEach(expense => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });
    return Object.entries(totals).map(([category, total]) => ({ category, total }));
  };

  const calculatePaymentMethodTotals = () => {
    const totals = {};
    expenses.forEach(expense => {
      totals[expense.paymentMethod] = (totals[expense.paymentMethod] || 0) + expense.amount;
    });
    return Object.entries(totals).map(([method, total]) => ({ method, total }));
  };

  const getLast12Months = () => {
    const end = endOfMonth(new Date());
    const start = startOfMonth(new Date(end.getFullYear() - 1, end.getMonth() + 1, 1));
    return eachMonthOfInterval({ start, end }).map(date => format(date, 'yyyy-MM'));
  };

  const calculateMonthlyTrendsData = () => {
    const last12Months = getLast12Months();
    const monthlyData = {};
    last12Months.forEach(month => {
      monthlyData[month] = 0;
    });
    expenses.forEach(expense => {
      const month = format(parseISO(expense.date), 'yyyy-MM');
      if (monthlyData.hasOwnProperty(month)) {
        monthlyData[month] += expense.amount;
      }
    });
    return Object.entries(monthlyData).map(([date, total]) => ({ date, total }));
  };

  const monthlyTotals = calculateMonthlyTotals();
  const categoryTotals = calculateCategoryTotals();
  const paymentMethodTotals = calculatePaymentMethodTotals();
  const monthlyTrendsData = calculateMonthlyTrendsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Expense Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryTotals}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Expenses by Payment Method</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodTotals}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {paymentMethodTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Monthly Expense Trends (Last 12 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;