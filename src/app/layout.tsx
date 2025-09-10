import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { pretendard, suite } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyCoffee.Ai",
  description: "MyCoffee.Ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} ${suite.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <div className="w-full sm:max-w-sm sm:mx-auto bg-background shadow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
