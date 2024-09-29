import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Be_Vietnam_Pro } from "next/font/google";
import { Lexend } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PulmoHealth",
  description: "Sistem pakar berbasis web untuk diagnosa penyakit paru-paru",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['apple-touch-icon.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased bg-[#151515]`}>
        {children}
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#151515',
              color: 'white',
              borderRadius: '8px',
              border: '0.2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 1)',
            },
          }}
        />
      </body>
    </html>
  );
}
