import "../styles/MasteryCard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function MasteryCard() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="UserMasteries">
      {currentUser.mastery.name.map((item, index) => {
        return (
          <div key={index}>
            <div
              className="UserMastery"
              style={{
                backgroundColor: theme.background,
                border: `solid 2px ${theme.gradientGold}`,
              }}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${item.championDataName}.png`}
                alt={item}
              />
              <div
                className="UserMasteryLevel"
                style={{
                  backgroundColor: theme.background,
                  border: `solid 2px ${theme.secondary}`,
                  color: theme.displayColor,
                }}
              >
                {currentUser.mastery.masteries[index].championLevel}
              </div>
              <div
                className="UserMasteryName"
                style={{
                  backgroundColor: theme.background,
                  border: `solid 2px ${theme.secondary}`,
                  color: theme.displayColor,
                }}
              >
                {currentUser.mastery.name[index].championName}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
