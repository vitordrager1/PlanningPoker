import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  variable: "--font-silkscreen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planning Poker",
  description: "Planning your sprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Obtendo dinamicamente o nome do componente filho

  return (
    <html lang="pt-br">
      <AuthProvider>
        <body
          className={`${silkscreen.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <ToastContainer
            autoClose={5000}
            theme="colored"
            closeOnClick={true}
          />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
