export const calculateCorrelation = (x, y) => {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b) / n;
    const meanY = y.reduce((a, b) => a + b) / n;
    const cov = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
    const stdX = Math.sqrt(x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0));
    const stdY = Math.sqrt(y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0));
    return cov / (stdX * stdY);
  };
  
  export const averageAndStdDev = (arr) => {
    const n = arr.length;
    const avg = arr.reduce((a, b) => a + b, 0) / n;
    const std = Math.sqrt(arr.reduce((s, v) => s + (v - avg) ** 2, 0) / n);
    return { avg, std };
  };