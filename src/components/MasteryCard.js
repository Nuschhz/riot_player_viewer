import "../styles/MasteryCard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function MasteryCard() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="MasteriesContainer" style={{ color: theme.textColor }}>
      <div
        className="MasteriesTag"
        style={{ backgroundColor: theme.background, borderColor: theme.blue01 }}
      >
        Maestrias
      </div>
      <div
        className="UserMasteries"
        style={{
          backgroundColor: theme.background + "80",
          borderColor: theme.blue00,
        }}
      >
        {currentUser.mastery.name.map((item, index) => {
          return (
            <div key={index}>
              <div className="UserMastery">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${currentUser.version}/img/champion/${item.championDataName}.png`}
                  alt={item}
                />
                <div className="MasteryStatus">
                  <span style={{ fontWeight: 500, color: theme.textColor }}>
                    {currentUser.mastery.name[index].championName}
                  </span>
                  <span
                    style={{
                      fontWeight: 300,
                      color: theme.gray00,
                      fontSize: "14px",
                    }}
                  >
                    Level: {currentUser.mastery.masteries[index].championLevel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
