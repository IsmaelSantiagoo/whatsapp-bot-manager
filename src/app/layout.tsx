import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "@/components/theme-provider";
import HeaderProvider from "@/context/header/provider";
import { LayoutProps } from "@/interfaces/LayoutProps";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whatsapp Administrator",
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="pt-BR" style={{ height: "100%" }} suppressHydrationWarning>
      <body className={`${inter.className} antialiased h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderProvider>
            {children}
            <ToastContainer
              position="bottom-right"
            />
          </HeaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
