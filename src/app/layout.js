import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/header/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Management Dashboard",
  description:
    "Management Dashboard | Next js | Ant Design | Zustand | React Query ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
