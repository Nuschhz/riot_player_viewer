import "../styles/SearchUser.css";

import axios from "axios";

import { useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";
import { LoadingContext } from "../context/LoadingContext";

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

  const getLeagueVersion = () =>
    axios
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.data[0])
      .catch((err) => console.log(err));

  const getUserProfileData = (leagueVersion) =>
    axios
      .get("http://localhost:4000/SummonerProfile", {
        params: {
          username: user,
          tagline: tag,
          server: server.serverIndex,
        },
      })
      .then((res) => {
        let profile = {};
        if (res.data.puuid !== undefined) {
          profile = {
            puuid: res.data.puuid,
            username: user,
            tagline: tag,
            server: server.serverName,
            version: leagueVersion,
            icon: `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/profileicon/${res.data.profileIconId}.png`,
            level: res.data.summonerLevel,
            exist: true,
          };
          return profile;
        }
        profile = { ...currentUser, exist: false };
        return profile;
      })
      .catch((err) => console.log(err));

  const getChampionsList = (leagueVersion) =>
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/data/en_US/champion.json`
      )
      .then((res) => res.data.data)
      .catch((err) => console.log(err));

  const getMastery = (userData) =>
    axios
      .get("http://localhost:4000/SummonerMastery", {
        params: { puuid: userData.puuid, server: server.serverIndex },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

  const getMatches = (userData) =>
    axios
      .get("http://localhost:4000/LeagueMatches", {
        params: { puuid: userData.puuid, continent: server.continentIndex },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

  const getChampionNamesForMasteries = (championsList, championId) => {
    const keyNames = Object.keys(championsList);
    let masteryNames = [];
    for (let i = 0; i < championId.length; i++) {
      for (let j = 0; j < keyNames.length; j++) {
        let champion = keyNames[j];
        if (
          championsList[champion].key === championId[i].championId.toString()
        ) {
          masteryNames.push({
            championDataName: championsList[champion].id.replaceAll(" ", ""),
            championName: championsList[champion].name,
          });
        }
      }
    }
    return masteryNames;
  };

  const getChampionNamesForMatches = (championsList, championId) => {
    const keyNames = Object.keys(championsList);
    let matchesNames = [];
    for (let i = 0; i < keyNames.length; i++) {
      let champion = keyNames[i];
      if (championsList[champion].key === championId.toString()) {
        matchesNames.push({
          championDataName: championsList[champion].id.replaceAll(" ", ""),
          championName: championsList[champion].name,
        });
      }
    }
    return matchesNames;
  };

  const getUserMatches = (userData, championsList, matches) => {
    let userLastPlayedGames = [];
    let wins = 0;
    let games = 0;
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].info.gameMode === "STRAWBERRY");
      else {
        for (let j = 0; j < matches[i].info.participants.length; j++) {
          if (userData.puuid === matches[i].info.participants[j].puuid) {
            if (matches[i].info.participants[j].win === true) {
              wins++;
            }
            games++;
            let championData = getChampionNamesForMatches(
              championsList,
              matches[i].info.participants[j].championId
            );
            userLastPlayedGames.push({
              champion: championData,
              win: matches[i].info.participants[j].win,
              kills: matches[i].info.participants[j].kills,
              deaths: matches[i].info.participants[j].deaths,
              assists: matches[i].info.participants[j].assists,
              duration: matches[i].info.gameDuration,
              build: [
                matches[i].info.participants[j].item0,
                matches[i].info.participants[j].item1,
                matches[i].info.participants[j].item2,
                matches[i].info.participants[j].item3,
                matches[i].info.participants[j].item4,
                matches[i].info.participants[j].item5,
                matches[i].info.participants[j].item6,
              ],
            });
          }
        }
      }
    }
    return {
      winrate: { wins: wins, games: games },
      matchesData: userLastPlayedGames,
    };
  };

  const handleCallUser = async () => {
    setLoading(true);
    setCurrentUser({ ...currentUser, searching: true });
    const leagueVersion = await getLeagueVersion();
    const userData = await getUserProfileData(leagueVersion);
    const championsList = await getChampionsList(leagueVersion);
    const masteries = await getMastery(userData);
    const matches = await getMatches(userData);
    const championNames = getChampionNamesForMasteries(
      championsList,
      masteries
    );
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
