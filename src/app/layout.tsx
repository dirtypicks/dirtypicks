import "./globals.css";
import { ReactNode, Suspense } from "react";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ToastProvider";

export const metadata = {
  title: "DirtyPicks",
  description: "App de picks deportivos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ToastProvider />
        <Navbar />
        <main className="mainContainer">
          <Suspense>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
