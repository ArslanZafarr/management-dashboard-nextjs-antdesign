"use client";
import { usePathname } from "next/navigation";
import Navbar from "../header/Navbar";

export default function WrapperLayout({ children }) {
  const pathname = usePathname();

  const excludedPaths = ["/login"];

  const isChangeLayoutPage = excludedPaths.some((path) => {
    if (typeof path === "string") {
      return path === pathname;
    } else if (path instanceof RegExp) {
      return path.test(pathname);
    }
    return false;
  });

  return (
    <>
      {!isChangeLayoutPage && <Navbar />}
      {children}
    </>
  );
}
