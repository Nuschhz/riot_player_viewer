import { getMatchChampionNames } from "./getChampionNames";

export const getUserMatches = (userData, championsList, matches) => {
  let userLastPlayedGames = [];
  let wins = 0;
  let games = 0;
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].info.gameMode === "STRAWBERRY");
    else {
      for (let j = 0; j < matches[i].info.participants.length; j++) {
        const match = matches[i].info.participants[j];
        if (userData.puuid === match.puuid) {
          if (match.win === true) {
            wins++;
          }
          games++;
          let championData = getMatchChampionNames(
            championsList,
            match.championId
          );
          userLastPlayedGames.push({
            champion: championData,
            win: match.win,
            kills: match.kills,
            deaths: match.deaths,
            assists: match.assists,
            duration: matches[i].info.gameDuration,
            build: [
              match.item0,
              match.item1,
              match.item2,
              match.item3,
              match.item4,
              match.item5,
              match.item6,
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
