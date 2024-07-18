import "../styles/Items.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Items({ index }) {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="ItemContainer">
      {currentUser.matches.matchesData[index].build.map((item, i) => {
        const matchesData = currentUser.matches.matchesData[index];
        return item === 0 ? (
          <div
            key={i}
            style={
              matchesData.win
                ? {
                    height: "32px",
                    width: "32px",
                    borderRadius: "4px",
                    backgroundColor: theme.background,
                  }
                : {
                    height: "32px",
                    width: "32px",
                    borderRadius: "4px",
                    backgroundColor: theme.background,
                  }
            }
          />
        ) : (
          <img
            key={i}
            src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${item}.png`}
            alt="item"
            style={
              matchesData.win
                ? {
                    height: "32px",
                    borderRadius: "4px",
                  }
                : {
                    height: "32px",
                    borderRadius: "4px",
                  }
            }
          />
        );
      })}
    </div>
  );
}
