import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setIsDark(saved === "dark");
  }, []);

  return (
    <button
      className="rounded-full p-2 border"
      aria-label="Toggle theme"
      onClick={() => setIsDark((v) => !v)}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
