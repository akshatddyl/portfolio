import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
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

export const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: '--font-cormorant',
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
      <body className={`${inter.variable} ${cormorant.variable} font-sans min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Full-width outer container to handle 100dvh correctly */}
          <div className="flex flex-col min-h-[100dvh]">
            
            {/* Full-width Navigation */}
            <header className="relative z-50 w-full flex items-center justify-between px-6 md:px-12 py-4 md:py-6 shrink-0">
              <Link 
                href="/" 
                className="font-serif italic text-2xl tracking-tight hover:opacity-70 transition-opacity"
              >
                akshatddyl
              </Link>
              
              <ThemeToggle />
            </header>

            {/* Centered Main Content Container */}
            <div className="max-w-[650px] w-full mx-auto px-6 flex-1 flex flex-col">
              {/* Main Content */}
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              
              {/* Footer */}
              <footer className="py-4 mt-2 border-t border-[var(--color-border)] text-sm text-[var(--color-muted-foreground)] flex flex-col items-center justify-center text-center gap-2 shrink-0">
                <p>📍 Dehradun, Uttarakhand, India | <LiveClock /> IST</p>
                <p> Made with ❤️‍🔥 and boredom</p>
              </footer>
            </div>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
