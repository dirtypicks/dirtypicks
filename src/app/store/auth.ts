// store/auth.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    role?: string;
    [key: string]: any; // por si tu payload tiene más cosas
}

interface AuthState {
    token: string | null;
    role: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token:
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null,
    role:
        typeof window !== "undefined"
            ? getRoleFromToken(sessionStorage.getItem("token"))
            : null,

    setToken: (token) => {
        if (token) {
            sessionStorage.setItem("token", token);
            const role = getRoleFromToken(token);
            set({ token, role });
        } else {
            sessionStorage.removeItem("token");
            set({ token: null, role: null });
        }
    },

    logout: () => {
        sessionStorage.removeItem("token");
        set({ token: null, role: null });
    },
}));

function getRoleFromToken(token: string | null): string | null {
    try {
        if (!token) return null;
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.role ?? null;
    } catch {
        return null;
    }
}
