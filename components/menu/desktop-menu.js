"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useNavigation, menuItems } from "./menu-context";
import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Button from "./Button";

const DesktopMenu = () => {
  const { activeItem } = useNavigation();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="px-6 border-b border-gray-200">
          <Logo />
        </div>

        <Navigation />

        <Button />
      </div>
    </aside>
  );
};

export default DesktopMenu;
