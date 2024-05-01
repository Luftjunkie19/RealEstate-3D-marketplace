import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "@/utils/contexts/userContext";
import VideoProvider from "@/utils/contexts/VideoProvider";

export const metadata: Metadata = {
  title: "VirtuEstate",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

  <AuthProvider>

      <body className=' bg-bgColor overflow-x-hidden'>
        <Navbar/>
              <Toaster/>
        {children}
        <Footer/>
      </body>
 
  </AuthProvider>

    </html>
  );
}
