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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
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
        <div className="h-[100dvh] flex flex-col">
          <div className="w-full sm:max-w-sm sm:mx-auto bg-background shadow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
