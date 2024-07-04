import "../styles/SearchUser.css";

import axios from "axios";

import { useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/fontawesome-free-solid";

export default function SearchUser() {
  const { setCurrentUser } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  const [isSelected, setIsSelected] = useState(false);
  const [server, setServer] = useState({
    serverName: "BR1",
    serverIndex: 0,
    continentIndex: 0,
  });
  const [user, setUser] = useState("");
  const [tag, setTag] = useState("");

  const servers = [];

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
          continent: server.continentIndex,
          server: server.serverIndex,
        },
      })
      .then((res) => {
        const profile = {
          puuid: res.data.puuid,
          username: user,
          tagline: tag,
          icon: `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/profileicon/${res.data.profileIconId}.png`,
          level: res.data.summonerLevel,
          exist: true,
        };

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
    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < matches[i].info.participants.length; j++) {
        if (userData.puuid === matches[i].info.participants[j].puuid) {
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
    return userLastPlayedGames;
  };

  const handleCallUser = async () => {
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
  };

  const handleSelectServer = () => setIsSelected(!isSelected);

  return (
    <div
      className="SearchContainer"
      style={{
        border: "solid",
        borderImage: theme.gradientGold,
        backgroundColor: theme.background,
      }}
    >
      <div style={{ color: theme.displayColor }}>
        <span>Server</span>
        <button
          style={{ color: theme.displayColor }}
          className="ServerButton"
          onClick={handleSelectServer}
        >
          <span>{server.serverName}</span>
          {isSelected ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      </div>

      <div style={{ color: theme.displayColor }}>
        <span>Username</span>
        <input
          style={{ color: theme.displayColor }}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
          maxLength={16}
          className="SearchInput"
        />
      </div>

      <div style={{ color: theme.displayColor }}>
        <span>Tagline</span>
        <div>
          <span style={{ color: theme.gray }}>#</span>
          <input
            style={{ color: theme.displayColor }}
            placeholder="Tagline"
            onChange={(e) => setTag(e.target.value)}
            maxLength={5}
            className="SearchInput"
          />
        </div>
      </div>

      <div>
        <button className="SearchButton" onClick={handleCallUser}>
          <FontAwesomeIcon icon={faSearch} color={theme.secondary} size="lg" />
        </button>
      </div>
    </div>
  );
}
