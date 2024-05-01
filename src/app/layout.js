"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/header/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WrapperLayout from "./components/wrapperLayout/wrapperLayout";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Management Dashboard",
//   description:
//     "Management Dashboard | Next js | Ant Design | Zustand | React Query ",
// };

const queryClient = new QueryClient({});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WrapperLayout>{children}</WrapperLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
