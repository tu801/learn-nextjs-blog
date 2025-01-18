"use client";
import { useThemeMode } from "flowbite-react";
import { ReactNode, useEffect, useState } from "react";

export default function ThemeComponent({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={mode}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen">
        {children}
      </div>
    </div>
  );
}
