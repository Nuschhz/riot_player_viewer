import "../styles/Scoreboard.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

import Items from "./Items";

export default function Scoreboard({ index }) {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let timeString;

    const hoursString = hours > 0 ? `${hours}` : "";

    const minutesString =
      minutes > 10 ? `${minutes}` : minutes > 0 ? `0${minutes}` : "00";

    const secondsString =
      remainingSeconds > 10
        ? `${remainingSeconds}`
        : remainingSeconds > 0
        ? `0${remainingSeconds}`
        : "00";

    if (hours > 0) {
      timeString = `${hoursString}:${minutesString}:${secondsString}`;
    } else {
      timeString = `${minutesString}:${secondsString}`;
    }

    return timeString;
  };

  const matchesData = currentUser.matches.matchesData[index];
  const time = convertSeconds(matchesData.duration);
  const remake = matchesData.duration / 60 <= 3;
  const win = matchesData.win;

  return (
    <div className="ScoreboardContainer">
      <div className="ScoreboardLeft">
        <div
          style={
            remake
              ? { color: theme.grayText00 }
              : win
              ? { color: theme.greenText00 }
              : { color: theme.redText00 }
          }
        >
          {remake ? "Recriação" : win ? "Vitória" : "Derrota"}
        </div>
        <Items index={index} />
      </div>
      <div className="ScoreboardRight">
        <div
          style={
            remake
              ? { color: theme.grayText01 }
              : win
              ? { color: theme.greenText01 }
              : { color: theme.redText01 }
          }
        >
          {matchesData.kills}/{matchesData.deaths}/{matchesData.assists}
        </div>
        <div
          className="Line"
          style={
            remake
              ? { backgroundColor: theme.grayText01 }
              : win
              ? { backgroundColor: theme.greenText01 }
              : { backgroundColor: theme.redText01 }
          }
        />
        <div
          style={
            remake
              ? { color: theme.grayText01 }
              : win
              ? { color: theme.greenText01 }
              : { color: theme.redText01 }
          }
        >
          {time}
        </div>
      </div>
    </div>
  );
}
