"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useScrollDetection } from "@/shared/hooks/useScrollDetection";
import { getInitials } from "@/shared/lib/utils";

import type { NavSection } from "@/features/portfolio/lib/getNavSections";
import { Portfolio } from "@/types";

const Header = ({ portfolio, navSections }: { portfolio: Portfolio; navSections: NavSection[] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = useScrollDetection();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-50 w-full ${
        scrolled && "bg-background/80 border-border/50 border-b backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-accent-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
        >
          {getInitials(portfolio.personal.name)}
        </motion.a>

        <nav className="hidden gap-8 md:flex">
          {navSections.map(
            (navSection) =>
              navSection.exists && (
                <motion.a
                  key={navSection.id}
                  href={`#${navSection.id}`}
                  whileHover={{ y: -2 }}
                  className="text-muted-foreground hover:text-foreground group relative text-sm font-medium transition-colors"
                >
                  {navSection.label}
                  <span className="bg-accent absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ),
          )}
        </nav>

        {menuOpen ? (
          <button onClick={() => setMenuOpen(false)} className="md:hidden" aria-label="Close navigation menu">
            <X size={24} aria-hidden="true" />
          </button>
        ) : (
          <button onClick={() => setMenuOpen(true)} className="md:hidden" aria-label="Open navigation menu">
            <Menu size={24} aria-hidden="true" />
          </button>
        )}
      </div>

      {menuOpen && (
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-border/50 bg-background/80 border-t py-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navSections.map(({ id, label }, index) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button variant="link" asChild className="w-full">
                      <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                        {label}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      )}
    </motion.header>
  );
};

export default Header;
