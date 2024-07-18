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
        color: theme.secondary,
      }}
    >
      <div className="IconCard">
        <img
          src={currentUser.icon}
          alt={currentUser.username + "icon"}
          style={{ borderColor: theme.blue01 }}
        />
        <span
          style={{
            fontSize: "12px",
            color: theme.textColor,
            borderColor: theme.blue01,
            backgroundColor: theme.gray01,
          }}
        >
          {currentUser.level}
        </span>
      </div>
      <div>
        <div style={{ color: theme.textColor }} className="ProfileTag">
          <span className="NameTag">
            {currentUser.username}
            <div style={{ color: theme.gray00 }}>#{currentUser.tagline}</div>
          </span>
          <span
            style={{ color: theme.gray00, borderColor: theme.gray00 }}
            className="ServerTag"
          >
            Server: {currentUser.server}
          </span>
        </div>
      </div>
    </div>
  );
}
