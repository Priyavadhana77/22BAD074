# 📈 Stock Price Aggregation Frontend & HTTP Microservice Calculator

This project consists of a **React + Vite frontend** for aggregating stock prices from various sources and a **Node.js microservice** that performs arithmetic calculations via HTTP endpoints.

---

## 🛠 Tech Stack

### Frontend (Stock Aggregation UI)
- **React**
- **Vite**
- **Tailwind CSS** (optional, if used)
- **Axios** for API calls
- **React Router** for navigation (if used)
- **ESLint** and **Prettier** for linting and formatting
- Hot Module Replacement via `@vitejs/plugin-react` or `@vitejs/plugin-react-swc`

### Backend (Calculator Microservice)
- **Node.js**
- **Express.js**
- **HTTP REST APIs**
- **CORS** for frontend-backend communication

---

## 📦 Features

### 🔹 React Frontend
- Fetches stock prices from multiple APIs (or mock services)
- Displays real-time aggregated data
- User-friendly UI to view stock data
- Error handling for failed fetches

### 🔸 Node.js Calculator Microservice
- Simple REST API for arithmetic operations:
  - Addition: `GET /add?a=5&b=3`
  - Subtraction: `GET /subtract?a=5&b=3`
  - Multiplication: `GET /multiply?a=5&b=3`
  - Division: `GET /divide?a=6&b=3`
- Lightweight and fast

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/your-username/repo22bad074.git
cd repo22bad074
