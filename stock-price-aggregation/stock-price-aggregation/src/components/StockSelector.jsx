import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const StockSelector = ({ options, selected, onChange }) => (
  <Autocomplete
    options={options}
    value={selected}
    onChange={(e, newVal) => onChange(newVal)}
    renderInput={(params) => <TextField {...params} label="Select Stock" margin="normal" />}
  />
);

export default StockSelector;
