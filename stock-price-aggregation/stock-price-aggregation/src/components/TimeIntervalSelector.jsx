import React from 'react';
import { Slider, Typography } from '@mui/material';

const TimeIntervalSelector = ({ value, onChange }) => (
  <>
    <Typography gutterBottom>Time Range (minutes): {value}</Typography>
    <Slider value={value} onChange={(e, v) => onChange(v)} min={5} max={120} step={5} />
  </>
);

export default TimeIntervalSelector;