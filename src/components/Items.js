import "../styles/Items.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Items({ index }) {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="ItemContainer">
      {currentUser.matches[index].build.map((item, i) => {
        return item === 0 ? null : (
          <img
            key={i}
            src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${item}.png`}
            alt="item"
            style={
              currentUser.matches[index].win
                ? {
                    height: "22px",
                    border: "solid",
                    borderImage: theme.gradientBlue,
                  }
                : {
                    height: "22px",
                    border: "solid",
                    borderImage: theme.gradientRed,
                  }
            }
          />
        );
      })}
    </div>
  );
}
