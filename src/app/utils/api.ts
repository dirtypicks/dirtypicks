import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
export const HOST = isProduction
  ? "https://dirtypicks-production.up.railway.app"
  : "http://localhost:4000";

export const HOST_FRONT = isProduction
  ? "https://dirtypicks.github.io/dirtypicks"
  : "http://localhost:3000/dirtypicks";

export const URL_BACK = `${HOST}/api`;

export const api = axios.create({ baseURL: URL_BACK });

// --- Interceptor para añadir JWT ---
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

export const registerUser = async (data: { name: string; email: string; password: string }) => {
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
    return err.response?.data || [];
  }
};

export const getPickById = async (id: string) => {
  try {
    const res = await api.get(`/picks/${id}`);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const createPick = async (pick: any) => {
  try {
    const res = await api.post("/picks", pick);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const updatePick = async (id: string, pick: any) => {
  try {
    const res = await api.put(`/picks/${id}`, pick);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const deletePick = async (id: string) => {
  try {
    const res = await api.delete(`/picks/${id}`);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

// --- Orders ---
export const createOrder = async (pickId: string, email: string | null, provider: string = "STRIPE") => {
  const data: any = { pickId, provider };
  if (email && email !== "") data.email = email;

  try {
    const res = await api.post("/orders", data);
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};

export const getOrders = async () => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch (err: any) {
    return err.response?.data;
  }
};
