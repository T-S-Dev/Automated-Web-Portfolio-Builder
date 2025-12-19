"use client";

import { useState } from "react";
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
    <header
      className={`fixed top-0 left-0 z-50 w-full ${scrolled && "bg-background/80 border-border/50 border-b backdrop-blur-md"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-background flex h-10 w-10 items-center justify-center rounded border-2 text-sm font-bold transition-all"
        >
          {getInitials(portfolio.personal.name)}
        </a>

        <nav className="hidden gap-6 md:flex">
          {navSections.map(
            (navSection) =>
              navSection.exists && (
                <a
                  key={navSection.id}
                  href={`#${navSection.id}`}
                  className="group text-muted-foreground hover:text-accent-teal after:bg-accent-teal relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full"
                >
                  {navSection.label}
                </a>
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
        <nav className="border-border/50 border-t py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navSections.map(({ id, label }) => (
              <Button key={id} variant="link" asChild>
                <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </Button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
