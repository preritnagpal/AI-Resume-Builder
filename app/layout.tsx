import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/context/query-provider";
import { ResumeInfoProvider } from "@/context/resume-info-provider"; // Add this import

const urbanist = Urbanist({ subsets: ["latin"] });
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "Hirelens.ai",
  description: "AI-powered resume tools", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen flex flex-col",
          open_sans.variable,
          urbanist.className
        )}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ResumeInfoProvider> {/* Wrap with ResumeInfoProvider */}
              {children}
              <Toaster />
            </ResumeInfoProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}