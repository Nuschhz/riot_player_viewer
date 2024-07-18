import "../styles/UserData.css";

import MasteryCard from "./MasteryCard";
import GameCard from "./GameCard";
import ProfileCard from "./ProfileCard";
import Winrate from "./Winrate";

export default function UserProfile() {
  return (
    <div className="UserDataContainer">
      <div className="TopWrapper">
        <ProfileCard />
        <Winrate />
        <MasteryCard />
      </div>
      <div className="BottomWrapper">
        <GameCard />
      </div>
    </div>
  );
}
