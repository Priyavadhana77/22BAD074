const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcml5YXZhZGhhbmEuMjJhZEBrY3QuYWMuaW4iLCJleHAiOjE3NTA0ODgwNzAsImlhdCI6MTc1MDQ4Nzc3MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFhOWM1OTdiLWIyMTQtNGE0MC05N2MyLWEzYTljNTA1NzBiNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByaXlhdmFkaGFuYSBrIiwic3ViIjoiYTQ5ODI1ZDQtZDQ2YS00YTU0LWFjNjItOTYyOTMyMmFmZjNiIn0sImVtYWlsIjoicHJpeWF2YWRoYW5hLjIyYWRAa2N0LmFjLmluIiwibmFtZSI6InByaXlhdmFkaGFuYSBrIiwicm9sbE5vIjoiMjJiYWQwNzQiLCJhY2Nlc3NDb2RlIjoiV2NUU0t2IiwiY2xpZW50SUQiOiJhNDk4MjVkNC1kNDZhLTRhNTQtYWM2Mi05NjI5MzIyYWZmM2IiLCJjbGllbnRTZWNyZXQiOiJ6UUZkbU1EdnNYTUpXcnZiIn0._u7KizBooaJRcO2bGvjOeRPcEEzk9uP62ZvkQhFRnGc'; // Replace with actual token

// In-memory sliding window
let numberWindow = [];

const API_MAP = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand',
};

// Utility function: average of array
const calculateAverage = (arr) => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / arr.length).toFixed(2));
};

// Route
app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  const url = API_MAP[numberid];

  if (!url) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const prevState = [...numberWindow];
  let fetchedNumbers = [];

  try {
    const response = await axios.get(url, {
        timeout: 500,
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });

    if (response.data && Array.isArray(response.data.numbers)) {
      fetchedNumbers = response.data.numbers;

      // Filter out duplicates
      for (const num of fetchedNumbers) {
        if (!numberWindow.includes(num)) {
          numberWindow.push(num);
        }
        if (numberWindow.length > WINDOW_SIZE) {
          numberWindow.shift(); // Remove oldest
        }
      }
    }
  } catch (err) {
    console.error('Error or timeout fetching numbers:', err.message);
    fetchedNumbers = []; // If failed, treat as no new numbers
  }

  const currState = [...numberWindow];
  const avg = calculateAverage(currState);

  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: fetchedNumbers,
    avg,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Average Calculator Microservice running at http://localhost:${PORT}`);
});
