import { createContext } from "react";

export const ThemeContext = createContext(null);

export default function ThemeContextProvider({ children, value }) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
