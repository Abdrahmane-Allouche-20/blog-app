import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import { ThemeProvider } from "next-themes";
import Theme from "./components/Theme";
import { ClerkProvider } from "@clerk/nextjs";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog app helps you share your ideas with others",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="dark:bg-gray-900">
      <body
        className={`${poppins.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300`}
      >
        
        <ThemeProvider attribute="class" defaultTheme="system">
          <Theme>
            <Header />
            {children}
          </Theme>
        </ThemeProvider>
       
      </body>
    </html>
</ClerkProvider>
  );
}
