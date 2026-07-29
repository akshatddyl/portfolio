import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { AiChat } from "@/components/AiChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshat Dhondiyal — Full Stack Developer",
  description:
    "Computer Science undergraduate and Full Stack Developer building distributed systems, AI applications, and developer tools. Explore my projects, skills, and experience.",
  keywords: [
    "Akshat Dhondiyal",
    "Full Stack Developer",
    "Computer Science",
    "Software Engineer",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "Distributed Systems",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Akshat Dhondiyal" }],
  creator: "Akshat Dhondiyal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshatddyl.is.a.dev",
    title: "Akshat Dhondiyal",
    description:
      "CS undergraduate interested in building low-level systems and high-performance backends.",
    siteName: "Akshat Dhondiyal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Dhondiyal — Full Stack Developer",
    description:
      "CS undergraduate interested in building low-level systems and high-performance backends.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Skip to content link */}
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>

          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CommandPalette />
          <AiChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
