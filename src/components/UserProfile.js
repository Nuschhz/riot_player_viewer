import "../styles/UserData.css";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

import MasteryCard from "./MasteryCard";
import GameCard from "./GameCard";
import ProfileCard from "./ProfileCard";

export default function UserProfile() {
  const { currentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="UserDataContainer"
      style={{
        backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentUser.mastery.name[0].championDataName}_0.jpg)`,
        backgroundSize: "cover",
        backgroundColor: theme.background,
      }}
    >
      <div className="LeftWrapper">
        <ProfileCard />
        <MasteryCard />
      </div>
      <div className="RightWrapper">
        <GameCard />
      </div>
    </div>
  );
}
