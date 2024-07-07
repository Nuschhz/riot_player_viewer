import "../styles/Scoreboard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Scoreboard({ index }) {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="ScoreboardContainer">
      <div
        style={
          currentUser.matches[index].win
            ? { color: theme.primary, fontWeight: 500 }
            : { color: theme.tertiary, fontWeight: 500 }
        }
      >
        {currentUser.matches[index].win ? "Vitória" : "Derrota"}
      </div>
      <div
        style={
          currentUser.matches[index].win
            ? { color: theme.primary, fontWeight: 500 }
            : { color: theme.tertiary, fontWeight: 500 }
        }
      >
        {currentUser.matches[index].kills} / {currentUser.matches[index].deaths}{" "}
        / {currentUser.matches[index].assists}
      </div>
    </div>
  );
}
