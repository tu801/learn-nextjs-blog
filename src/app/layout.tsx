import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from "@/components/header";
import ThemeComponent from "@/components/theme-component";
import { ClerkProvider } from "@clerk/nextjs";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { defaultMetadata } from "@/config/metadata";
import FooterCom from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ErrorProvider>
            <ThemeComponent>
              <Headers></Headers>
              {children}
              <FooterCom></FooterCom>
            </ThemeComponent>
          </ErrorProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
