import "../styles/Menu.css";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";

import Header from "../components/Header";
import SearchUser from "../components/SearchUser";
import UserData from "../components/UserData";

export default function Menu() {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(SearchContext);

  return (
    <div>
      <Header />
      <div
        className="background"
        style={{
          backgroundImage: theme.backgroundGradient,
        }}
      >
        {currentUser.exist ? (
          <div
            style={{
              backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentUser.mastery.name[0].championDataName}_0.jpg)`,
            }}
            className="championBackground"
          />
        ) : null}
        <div
          style={{
            backgroundColor: theme.background,
          }}
          className="championBackgroundColor"
        />
        <SearchUser />
        <UserData />
      </div>
    </div>
  );
}
