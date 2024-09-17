"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "@radix-ui/react-toggle";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Toggle>
  );
};

export default ThemeToggle;
