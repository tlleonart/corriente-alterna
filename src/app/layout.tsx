import type { Metadata } from "next";
import { Londrina_Solid } from 'next/font/google'
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from "@next/third-parties/google";

const bricolageGrotesque = Londrina_Solid({ subsets: ["latin"], weight: ["400", "100", "300", "900"] })

export const metadata: Metadata = {
  title: "Corriente Alterna",
  description: "Bienvenidos al Festival Corriente Alterna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={bricolageGrotesque.className}
      >
        <GoogleTagManager gtmId="GTM-57CM6WQB" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
