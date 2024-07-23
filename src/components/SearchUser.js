import "../styles/SearchUser.css";

import { useState, useContext } from "react";

import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";
import { LoadingContext } from "../context/LoadingContext";

import { getLeagueVersion } from "../services/getLeagueVersion";
import { getUserProfileData } from "../services/getUserProfileData";
import { getChampionsList } from "../services/getChampionsList";
import { getMastery } from "../services/getMastery";
import { getMatches } from "../services/getMatches";
import { getMasteryChampionNames } from "../services/getChampionNames";
import { getUserMatches } from "../services/getUserMatches";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dropdown from "./Dropdown";

export default function SearchUser() {
  const { currentUser, setCurrentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  const { setLoading } = useContext(LoadingContext);

  const [user, setUser] = useState("");
  const [tag, setTag] = useState("");
  const [click, setClick] = useState(false);

  const continents = {
    americas: 0,
    europe: 1,
    asia: 2,
  };

  const servers = [
    {
      serverName: "BR",
      serverIndex: 0,
      continentIndex: continents.americas,
    },
    {
      serverName: "NA",
      serverIndex: 1,
      continentIndex: continents.americas,
    },
    {
      serverName: "EUW",
      serverIndex: 2,
      continentIndex: continents.europe,
    },
    {
      serverName: "KR",
      serverIndex: 3,
      continentIndex: continents.asia,
    },
  ];

  const [server, setServer] = useState(servers[0]);

  const handleCallUser = async () => {
    setLoading(true);
    setCurrentUser({ ...currentUser, searching: true });
    const leagueVersion = await getLeagueVersion();
    const userData = await getUserProfileData(
      user,
      tag,
      server,
      currentUser,
      leagueVersion
    );
    const championsList = await getChampionsList(leagueVersion);
    const masteries = await getMastery(userData, server);
    const matches = await getMatches(userData, server);
    const championNames = getMasteryChampionNames(championsList, masteries);
    const userMatches = getUserMatches(userData, championsList, matches);
    setCurrentUser({
      ...userData,
      mastery: { name: championNames, masteries: masteries },
      matches: userMatches,
    });
    setLoading(false);
  };

  const handleMouseDown = () => {
    setClick(true);
  };
  const handleMouseUp = () => {
    setClick(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCallUser();
    }
  };

  return (
    <div
      className="SearchContainer"
      style={{
        backgroundColor: theme.gray01,
      }}
    >
      <div style={{ color: theme.displayColor }} className="Dropdown">
        <span>Server</span>
        <Dropdown server={server} setServer={setServer} servers={servers} />
      </div>

      <div style={{ color: theme.displayColor }}>
        <span>Username</span>
        <input
          style={{ color: theme.displayColor }}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
          maxLength={16}
          className="SearchInput"
          onKeyDown={handleKeyDown}
        />
      </div>

      <div style={{ color: theme.displayColor }}>
        <span>Tagline</span>
        <div>
          <span style={{ color: theme.gray00 }}>#</span>
          <input
            style={{ color: theme.displayColor }}
            placeholder="Tagline"
            onChange={(e) => setTag(e.target.value)}
            maxLength={5}
            className="SearchInput"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div>
        <button
          className="SearchButton"
          onClick={handleCallUser}
          style={
            click
              ? { backgroundColor: theme.blue00 }
              : { backgroundColor: theme.blue01 }
          }
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
        >
          <FontAwesomeIcon
            icon={"chevron-right"}
            color={theme.displayColor}
            size="lg"
          />
        </button>
      </div>
    </div>
  );
}
