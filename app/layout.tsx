import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "@/utils/contexts/userContext";
import HelperChat from "./components/HelperAIChat/HelperChat";
import NotificationDisplay from "./components/notifications/NotificationDisplay";


export const metadata: Metadata = {
  title: "VirtuEstate",
  description: "VirtuEstate is a great place for real estate vendors, buyers and not only. We excel at providing an unknown solution on the market. Which is comibining 3D models with AI.",
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
        <Navbar />
      
              <Toaster/>
        {children}
        <NotificationDisplay/>
        <HelperChat/>
        <Footer/>
      </body>
   
  </AuthProvider>

    </html>
  );
}
