const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  jwtSecret: import.meta.env.VITE_JWT_SECRET,
};

export default config;
