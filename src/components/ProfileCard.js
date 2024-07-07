import "../styles/ProfileCard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileCard() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="UserProfile"
      style={{
        border: "solid",
        borderImage: theme.gradientGold,
        backgroundColor: theme.background + "BF",
        color: theme.secondary,
      }}
    >
      <img src={currentUser.icon} alt={currentUser.username + "icon"} />
      <div>
        <span>{currentUser.username}</span>
        <span style={{ fontSize: "16px" }}>Nível {currentUser.level}</span>
      </div>
    </div>
  );
}
