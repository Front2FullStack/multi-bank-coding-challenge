"use client";
import { startTransition, useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    startTransition(() => {
      if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else if (savedTheme === "light") {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      } else {
        // Respect OS preference if no saved theme
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    });
  }, []);

  return {
    isDarkMode,
    setIsDarkMode,
  };
}
