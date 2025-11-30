"use client";

import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Button from "./Button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <Logo />

        <button onClick={() => setIsOpen((prev) => !prev)} className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-secondary">
          {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-border bg-background lg:hidden">
              <div className="flex h-full flex-col">
                <div className="px-6 border-b border-gray-200">
                  <Logo />
                </div>

                <Navigation setIsOpen={() => setIsOpen(false)} />

                <Button />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
