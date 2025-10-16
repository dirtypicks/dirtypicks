// Manejo de JWT y rol
export const setToken = (token: string) => sessionStorage.setItem("token", token);
export const getToken = () => sessionStorage.getItem("token");
export const removeToken = () => sessionStorage.removeItem("token");

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || "user";
  } catch {
    return "user";
  }
};
