import { toast, ToastOptions } from 'react-toastify';

type ToastType = "info" | "success" | "warning" | "error";

interface ShowToastOptions extends ToastOptions {
    type?: ToastType;
}

export const showToast = (
    message: string,
    type: ToastType = "info",
    options?: ShowToastOptions
) => {
    toast(message, { type, ...options });
};
