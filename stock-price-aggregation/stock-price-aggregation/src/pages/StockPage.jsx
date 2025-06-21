import React, { useEffect, useState } from 'react';
import { fetchStocks, fetchStockPrices } from '../utils/stockApi';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Autocomplete, TextField, Slider } from '@mui/material';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const StockPage = () => {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState('NVDA');
  const [time, setTime] = useState(30);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchStocks().then(setStocks);
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchStockPrices(selectedStock, time).then(setPrices);
    }
  }, [selectedStock, time]);

  const chartData = () => {
    const labels = prices.map(p => new Date(p.lastUpdatedAt).toLocaleTimeString());
    const data = prices.map(p => p.price);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    return {
      labels,
      datasets: [
        {
          label: `${selectedStock} Price`,
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
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Stock Price Viewer</Typography>
      <Autocomplete
        options={Object.values(stocks)}
        value={selectedStock}
        onChange={(e, newVal) => setSelectedStock(newVal)}
        renderInput={(params) => <TextField {...params} label="Select Stock" margin="normal" />}
      />
      <Typography>Time Range (minutes): {time}</Typography>
      <Slider value={time} onChange={(e, v) => setTime(v)} min={5} max={120} step={5} />
      <Line data={chartData()} />
    </Box>
  );
};

export default StockPage;