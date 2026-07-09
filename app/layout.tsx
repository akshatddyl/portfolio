import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

// 1. Configure the fonts
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "akshat.",
  description: "Personal portfolio, blog, and project showcase.",
};

import { LiveClock } from "@/components/LiveClock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Main container: centrally aligned, max 650px, no global vertical padding */}
          <div className="max-w-[650px] mx-auto px-6 flex flex-col min-h-[100dvh]">
            
            {/* Navigation */}
            <header className="flex items-center justify-between py-6 md:py-8 shrink-0">
              <Link 
                href="/" 
                className="font-serif italic text-2xl tracking-tight hover:opacity-70 transition-opacity"
              >
                akshat
              </Link>
              
              <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="py-6 mt-4 border-t border-[var(--color-border)] text-sm text-[var(--color-muted-foreground)] flex flex-col items-center justify-center text-center gap-2 shrink-0">
              <p>📍 Dehradun, Uttarakhand, India • <LiveClock /> IST</p>
            </footer>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
