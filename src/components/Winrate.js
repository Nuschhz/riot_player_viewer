import "../styles/Winrate.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Winrate() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  console.log(currentUser);
  const winrate = currentUser.matches.winrate;

  const Circle = ({ color, percentage }) => {
    const r = 32;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
      <circle
        r={r}
        cx={150}
        cy={50}
        fill="transparent"
        stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
        strokeWidth={"8px"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
        strokeLinecap="round"
      ></circle>
    );
  };

  const Text = ({ percentage }) => {
    return (
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={"16px"}
        fill={theme.textColor}
      >
        {percentage.toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="WinrateContainer">
      <span
        className="WinrateTag"
        style={{
          backgroundColor: theme.background,
          color: theme.textColor,
          borderColor: theme.blue00,
        }}
      >
        Taxa de Vitórias
      </span>
      <svg width={100} height={100}>
        <g transform={`rotate(-90 ${"100 100"})`}>
          <Circle color={theme.redText00} />
          <Circle
            color={theme.blue00}
            percentage={(winrate.wins * 100) / winrate.games}
          />
        </g>
        <Text percentage={(winrate.wins * 100) / winrate.games} />
      </svg>
    </div>
  );
}
