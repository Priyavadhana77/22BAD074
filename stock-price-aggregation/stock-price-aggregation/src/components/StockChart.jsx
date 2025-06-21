import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const StockChart = ({ prices, ticker }) => {
  const labels = prices.map(p => new Date(p.lastUpdatedAt).toLocaleTimeString());
  const data = prices.map(p => p.price);
  const avg = data.reduce((a, b) => a + b, 0) / data.length;

  const chartData = {
    labels,
    datasets: [
      {
        label: `${ticker} Price`,
        data,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Average',
        data: Array(data.length).fill(avg),
        borderColor: 'red',
        borderDash: [5, 5],
      },
    ],
  };

  return <Line data={chartData} />;
};

export default StockChart;
