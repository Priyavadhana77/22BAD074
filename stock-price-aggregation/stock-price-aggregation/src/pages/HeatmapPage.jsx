import React, { useEffect, useState } from 'react';
import { fetchStocks, fetchStockPrices } from '../utils/stockApi';
import { calculateCorrelation, averageAndStdDev } from '../utils/correlationUtils';
import { Box, Typography, Slider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';

const HeatmapPage = () => {
  const [stocks, setStocks] = useState({});
  const [time, setTime] = useState(30);
  const [pricesMap, setPricesMap] = useState({});
  const [correlations, setCorrelations] = useState([]);

  useEffect(() => {
    fetchStocks().then(setStocks);
  }, []);

  useEffect(() => {
    const tickers = Object.values(stocks);
    Promise.all(
      tickers.map(ticker => fetchStockPrices(ticker, time).then(data => ({ ticker, data: data.map(d => d.price) })))
    ).then(res => {
      const map = Object.fromEntries(res.map(({ ticker, data }) => [ticker, data]));
      setPricesMap(map);
    });
  }, [stocks, time]);

  useEffect(() => {
    const tickers = Object.keys(pricesMap);
    const matrix = tickers.map(row => tickers.map(col => {
      const x = pricesMap[row] || [], y = pricesMap[col] || [];
      if (x.length === y.length && x.length > 1) return calculateCorrelation(x, y);
      return 0;
    }));
    setCorrelations(matrix);
  }, [pricesMap]);

  const tickers = Object.keys(pricesMap);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Correlation Heatmap</Typography>
      <Typography>Time Range (minutes): {time}</Typography>
      <Slider value={time} onChange={(e, v) => setTime(v)} min={5} max={120} step={5} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {tickers.map(t => (
              <Tooltip title={(() => {
                const { avg, std } = averageAndStdDev(pricesMap[t] || []);
                return `Avg: ${avg.toFixed(2)} | Std: ${std.toFixed(2)}`;
              })()} key={t}><TableCell>{t}</TableCell></Tooltip>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers.map((row, i) => (
            <TableRow key={row}>
              <Tooltip title={(() => {
                const { avg, std } = averageAndStdDev(pricesMap[row] || []);
                return `Avg: ${avg.toFixed(2)} | Std: ${std.toFixed(2)}`;
              })()}><TableCell>{row}</TableCell></Tooltip>
              {correlations[i]?.map((val, j) => (
                <TableCell key={j} sx={{ backgroundColor: `rgba(255, 0, 0, ${Math.abs(val)})` }}>
                  {val.toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HeatmapPage;