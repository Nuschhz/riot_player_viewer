import "../styles/GameCard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

import Items from "./Items";
import Scoreboard from "./Scoreboard";

export default function GameCard() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="GamesContainer"
      style={{
        border: "solid",
        borderImage: theme.gradientGold,
        backgroundColor: theme.background + "BF",
        color: theme.secondary,
        scrollbarColor: `${theme.gray} transparent`,
      }}
    >
      <div className="CardContainer">
        {currentUser.matches.map((item, index) => {
          return (
            <div
              key={index}
              className="GameCard"
              style={
                currentUser.matches[index].win
                  ? {
                      backgroundColor: theme.background,
                      border: "solid",
                      borderImage: theme.gradientBlue,
                    }
                  : {
                      backgroundColor: theme.background,
                      border: "solid",
                      borderImage: theme.gradientRed,
                    }
              }
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${currentUser.matches[index].champion[0].championDataName}.png`}
                alt=""
                style={{ height: "64px" }}
              />
              <div className="GameStats">
                <Scoreboard index={index} />
                <Items index={index} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
