const express = require('express');
const app = express();
const port = 3000;

let window = [];

app.use(express.json());

app.get('/numbers', (req, res) => {
  const numbers = req.body.numbers || [];

  const uniqueNumbers = [...new Set([...window, ...numbers])];
  if (uniqueNumbers.length > 10) {
    window = uniqueNumbers.slice(uniqueNumbers.length - 10);
  } else {
    window = uniqueNumbers;
  }

  const avg = window.length ? window.reduce((a, b) => a + b, 0) / window.length : 0;

  res.json({
    windowPrevState: [],  // For now, you can update this later
    windowCurrState: window,
    numbers,
    avg
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
