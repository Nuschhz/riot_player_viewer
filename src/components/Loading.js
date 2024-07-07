import "../styles/Loading.css";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Loading() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ color: theme.displayColor }} className="LoadingContainer">
      <div
        className="Spinner"
        style={{
          border: `4px solid ${theme.darkGold}`,
          borderTop: `4px solid ${theme.secondary}`,
        }}
      />
    </div>
  );
}
