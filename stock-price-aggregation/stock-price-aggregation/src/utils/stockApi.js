// import axios from 'axios';

// const BASE_URL = 'http://20.244.56.144/evaluation-service';

// export const fetchStocks = async () => {
//   const res = await axios.get(`${BASE_URL}/stocks`);
//   return res.data.stocks;
// };

// export const fetchStockPrices = async (ticker, minutes) => {
//   const res = await axios.get(`${BASE_URL}/stocks/${ticker}?minutes=${minutes}`);
//   return res.data;
// };




import axios from 'axios';

const BASE_URL ='/api/evaluation-service';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcml5YXZhZGhhbmEuMjJhZEBrY3QuYWMuaW4iLCJleHAiOjE3NTA0ODQ4OTEsImlhdCI6MTc1MDQ4NDU5MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk2YmEzNWIzLWI2ZWYtNDFjOS04N2IyLWY5OGI1MWIzMmFlYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByaXlhdmFkaGFuYSBrIiwic3ViIjoiYTQ5ODI1ZDQtZDQ2YS00YTU0LWFjNjItOTYyOTMyMmFmZjNiIn0sImVtYWlsIjoicHJpeWF2YWRoYW5hLjIyYWRAa2N0LmFjLmluIiwibmFtZSI6InByaXlhdmFkaGFuYSBrIiwicm9sbE5vIjoiMjJiYWQwNzQiLCJhY2Nlc3NDb2RlIjoiV2NUU0t2IiwiY2xpZW50SUQiOiJhNDk4MjVkNC1kNDZhLTRhNTQtYWM2Mi05NjI5MzIyYWZmM2IiLCJjbGllbnRTZWNyZXQiOiJ6UUZkbU1EdnNYTUpXcnZiIn0.FQA4K800NLTeg7Ve3zU9yvGbOhD7PWeTrLsJd3rsW2M'; // Replace with your actual token

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export const fetchStocks = async () => {
  const res = await axiosInstance.get('/stocks');
  return res.data.stocks;
};

export const fetchStockPrices = async (ticker, minutes) => {
  const res = await axiosInstance.get(`/stocks/${ticker}?minutes=${minutes}`);
  return res.data;
};
