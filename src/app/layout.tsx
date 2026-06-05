import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jyothi Swaroop | AI/ML Engineer & Data Scientist",
  description:
    "Portfolio of Jyothi Swaroop Akasamu — AI/ML Engineer and Data Scientist specializing in production-grade AI systems, RAG frameworks, and scalable backend applications.",
  keywords: [
    "Jyothi Swaroop",
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "RAG",
    "LangChain",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Jyothi Swaroop Akasamu" }],
  openGraph: {
    title: "Jyothi Swaroop | AI/ML Engineer & Data Scientist",
    description:
      "AI/ML Engineer and Data Scientist specializing in production-grade AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
