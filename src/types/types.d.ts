export type NavTypes = {
  id: string;
  href: string;
  src: string;
  alt: string;
}[];

export type ThemeTypes = "light" | "dark" | "system";
export interface ContextType {
  theme: ThemeTypes;
  setTheme: (theme: ThemeTypes) => void;
}
