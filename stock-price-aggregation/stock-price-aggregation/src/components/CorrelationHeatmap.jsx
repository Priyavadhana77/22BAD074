import React from 'react';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Tooltip } from '@mui/material';
import { averageAndStdDev } from '../utils/correlationUtils';

const CorrelationHeatmap = ({ tickers, pricesMap, correlations }) => {
  return (
    <Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {tickers.map(t => (
              <Tooltip
                key={t}
                title={() => {
                  const { avg, std } = averageAndStdDev(pricesMap[t] || []);
                  return `Avg: ${avg.toFixed(2)} | Std: ${std.toFixed(2)}`;
                }}
              >
                <TableCell>{t}</TableCell>
              </Tooltip>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers.map((row, i) => (
            <TableRow key={row}>
              <Tooltip
                title={() => {
                  const { avg, std } = averageAndStdDev(pricesMap[row] || []);
                  return `Avg: ${avg.toFixed(2)} | Std: ${std.toFixed(2)}`;
                }}
              >
                <TableCell>{row}</TableCell>
              </Tooltip>
              {correlations[i]?.map((val, j) => (
                <TableCell
                  key={j}
                  sx={{ backgroundColor: `rgba(255, 0, 0, ${Math.abs(val)})` }}
                >
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

export default CorrelationHeatmap;