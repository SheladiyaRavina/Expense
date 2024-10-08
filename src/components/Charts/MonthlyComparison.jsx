import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useExpenseContext } from '../../context/ExpenseContext';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyComparison = () => {
  const { state } = useExpenseContext();

  const last6Months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date(),
  });

  const monthlyTotals = last6Months.map((month) => {
    const startDate = startOfMonth(month);
    const endDate = endOfMonth(month);
    
    const total = state.expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      month: format(month, 'MMM yyyy'),
      total,
    };
  });

  const data = {
    labels: monthlyTotals.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyTotals.map((item) => item.total),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expense Comparison',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MonthlyComparison;