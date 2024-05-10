"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SunIcon, MoonIcon, ComputerIcon } from "lucide-react";
import { ThemeTypes } from "@/types/types";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mount, setMount] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const updateThemeHandler = (chosenTheme: ThemeTypes) => {
    setTheme(chosenTheme);
  };

  React.useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem
            className={`dark:text-black`}
            onClick={() => updateThemeHandler("light")}
          >
            <SunIcon />
            <span className="ml-2">Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`dark:text-black`}
            onClick={() => updateThemeHandler("dark")}
          >
            <MoonIcon />
            <span className="ml-2">Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`dark:text-black`}
            onClick={() => updateThemeHandler("system")}
          >
            <ComputerIcon />
            <span className="ml-2">System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeToggle;
