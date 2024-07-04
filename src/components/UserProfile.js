import "../styles/UserData.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function UserProfile() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  console.log(currentUser);

  return (
    <div
      className="UserDataContainer"
      style={{
        backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentUser.mastery.name[0].championDataName}_1.jpg)`,
        backgroundSize: "cover",
        backgroundColor: theme.background,
      }}
    >
      <div className="LeftWrapper">
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
      </div>
      <div className="RightWrapper">
        <div
          className="LastGames"
          style={{
            border: "solid",
            borderImage: theme.gradientGold,
            backgroundColor: theme.background + "BF",
            color: theme.secondary,
            scrollbarColor: `${theme.gray} transparent`,
          }}
        >
          <div className="GamesContainer">
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
                  <div>
                    <div className="TopWrapper">
                      <div
                        style={
                          currentUser.matches[index].win
                            ? { color: theme.primary }
                            : { color: theme.tertiary }
                        }
                      >
                        {currentUser.matches[index].win ? "Vitória" : "Derrota"}
                      </div>
                      <div
                        style={
                          currentUser.matches[index].win
                            ? { color: theme.primary }
                            : { color: theme.tertiary }
                        }
                      >
                        {currentUser.matches[index].kills} /{" "}
                        {currentUser.matches[index].deaths} /{" "}
                        {currentUser.matches[index].assists}
                      </div>
                    </div>
                    <div className="BottomWrapper">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
