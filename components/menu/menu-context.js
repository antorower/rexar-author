"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, FileText, Settings, Sparkles, LibraryBig } from "lucide-react";

const NavigationContext = createContext(null);

export const menuItems = [
  { icon: LayoutDashboard, label: "Γραφείο", href: "/" },
  { icon: BookOpen, label: "Νέο Βιβλίο", href: "/create" },
  { icon: LibraryBig, label: "Βιβλιοθήκη", href: "/books" },
  { icon: Settings, label: "Ρυθμίσεις", href: "/settings" },
];

function getActiveLabelFromPath(pathname) {
  if (pathname === "/") return "Γραφείο";
  if (pathname.startsWith("/create")) return "Νέο Βιβλίο";
  if (pathname.startsWith("/books")) return "Βιβλιοθήκη";
  if (pathname.startsWith("/settings")) return "Ρυθμίσεις";
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
