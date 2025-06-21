import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockPage from './pages/StockPage';
import HeatmapPage from './pages/HeatmapPage';
import axios from 'axios';

// Globally set auth token header
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcml5YXZhZGhhbmEuMjJhZEBrY3QuYWMuaW4iLCJleHAiOjE3NTA0ODE0OTksImlhdCI6MTc1MDQ4MTE5OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ3OWU0MjRkLTMxNDUtNDYxNS1hMzEzLTEzYTI5ZTIzOGNmZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByaXlhdmFkaGFuYSBrIiwic3ViIjoiYTQ5ODI1ZDQtZDQ2YS00YTU0LWFjNjItOTYyOTMyMmFmZjNiIn0sImVtYWlsIjoicHJpeWF2YWRoYW5hLjIyYWRAa2N0LmFjLmluIiwibmFtZSI6InByaXlhdmFkaGFuYSBrIiwicm9sbE5vIjoiMjJiYWQwNzQiLCJhY2Nlc3NDb2RlIjoiV2NUU0t2IiwiY2xpZW50SUQiOiJhNDk4MjVkNC1kNDZhLTRhNTQtYWM2Mi05NjI5MzIyYWZmM2IiLCJjbGllbnRTZWNyZXQiOiJ6UUZkbU1EdnNYTUpXcnZiIn0.BKdV4KsIq6QD7P68nzKpbOB3GVtif7iW6OIJKh6XgCg';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Routes>
    </Router>
  );
};

export default App;