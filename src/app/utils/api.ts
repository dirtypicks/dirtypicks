import axios from "axios";

const BASE_URL = "https://dirtypicks-production.up.railway.app/api"; // tu backend

const api = axios.create({ baseURL: BASE_URL });

// Añadir JWT a headers
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth ---
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const registerUser = async (data: { name: string; email: string; password: string; }) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const res = await api.post("/auth/verify-email", { token });
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const res = await api.post("/auth/request-password-reset", { email });
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const res = await api.post("/auth/reset-password", { token, newPassword });
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

// --- Picks ---
export const getAllPicks = async () => {
  try {
    const res = await api.get("/picks");
    return res.data;
  } catch (err: any) {
    return [];
  }
};

export const getPickById = async (id: string) => {
  const res = await api.get(`/picks/${id}`);
  return res.data;
};

export const createPick = async (pick: any) => {
  const res = await api.post("/picks", pick);
  return res.data;
};

export const updatePick = async (id: string, pick: any) => {
  const res = await api.put(`/picks/${id}`, pick);
  return res.data;
};

export const deletePick = async (id: string) => {
  const res = await api.delete(`/picks/${id}`);
  return res.data;
};

// --- Orders ---
export const createOrder = async (pickId: string) => {
  const res = await api.post("/orders", { pickId });
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};
