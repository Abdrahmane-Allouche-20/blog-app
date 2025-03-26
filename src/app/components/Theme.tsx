"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ThemeProps {
  children: ReactNode;
}

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const { theme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
  <div className={theme}>
    <div className="bg-white dark:bg-slate-900  text-slate-950 dark:text-white min-h-screen">
        {children}
        </div>
    </div>)
};

export default Theme;
