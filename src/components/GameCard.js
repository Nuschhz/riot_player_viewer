import "../styles/GameCard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

import Scoreboard from "./Scoreboard";

export default function GameCard() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  console.log(currentUser);

  return (
    <div
      className="GamesContainer"
      style={{
        scrollbarColor: `${theme.gray01} transparent`,
      }}
    >
      <div className="CardContainer">
        {currentUser.matches.matchesData.map((item, index) => {
          const matchesData = currentUser.matches.matchesData[index];
          const remake = matchesData.duration / 60 <= 3;
          const win = matchesData.win;
          return (
            <div
              key={index}
              className="GameCard"
              style={
                remake
                  ? {
                      backgroundImage: theme.grayGradientFill,
                      borderImage: theme.grayGradientStroke,
                    }
                  : win
                  ? {
                      backgroundImage: theme.greenGradientFill,
                      borderImage: theme.greenGradientStroke,
                    }
                  : {
                      backgroundImage: theme.redGradientFill,
                      borderImage: theme.redGradientStroke,
                    }
              }
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${currentUser.version}/img/champion/${matchesData.champion[0].championDataName}.png`}
                alt=""
                style={{ height: "86px", margin: "12px" }}
              />
              <div className="GameStats">
                <Scoreboard index={index} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
