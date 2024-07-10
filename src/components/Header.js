import "../styles/Header.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className="headerContainer"
      style={{
        backgroundColor: theme.primary,
        borderBottom: `1px solid ${theme.secondary}`,
        color: theme.displayColor,
      }}
    >
      SUMMONER PROFILE
    </header>
  );
}
