import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/Provider";
import ReduxProvider from "./redux/ReduxProvider";
import InitUser from "./InitUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CityTaxxo - Smart Vehical Booking Plateform",
  description:
    "CityTaxxo is a smart vehicle booking platform designed to provide fast, safe, and affordable transportation services. Users can easily book rides, track drivers in real time, and enjoy a smooth travel experience. The platform offers reliable cab services with user-friendly features, secure payments, and efficient route management for daily commuting and city travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider>
            <InitUser/>
            {children}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
