"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" /> : <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
