import "../styles/Header.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className="headerContainer"
      style={{
        backgroundColor: theme.blue01,
        color: theme.displayColor,
        fontWeight: 200,
      }}
    >
      SUMMONER.GG
    </header>
  );
}
