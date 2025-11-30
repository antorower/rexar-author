"use client";
import { useNavigation, menuItems } from "./menu-context";
import Link from "next/link";
import { motion } from "framer-motion";

const Navigation = ({ setIsOpen }) => {
  const { activeItem } = useNavigation();

  return (
    <nav className="flex-1 space-y-1 px-4 py-6">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.label;

        return (
          <Link key={item.label} href={item.href} onClick={setIsOpen} className={`group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-secondary"}`}>
            {isActive && (
              <motion.div
                layoutId="activeMobileIndicator"
                className="absolute inset-0 rounded-xl bg-primary"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            <Icon className={`relative h-5 w-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
