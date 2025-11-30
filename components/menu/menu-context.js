"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, FileText, Settings, Sparkles } from "lucide-react";

const NavigationContext = createContext(null);

export const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "My eBooks", href: "/books" },
  //{ icon: Sparkles, label: "AI Assistant", href: "/ai" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

function getActiveLabelFromPath(pathname) {
  if (pathname === "/") return "Dashboard";
  if (pathname.startsWith("/books")) return "My eBooks";
  if (pathname.startsWith("/ai")) return "AI Assistant";
  if (pathname.startsWith("/settings")) return "Settings";
  return "";
}

export const NavigationProvider = ({ children }) => {
  const pathname = usePathname();
  const activeItem = getActiveLabelFromPath(pathname);

  return <NavigationContext.Provider value={{ activeItem, pathname }}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return ctx;
};
