import axios from "axios";

export const getChampionsList = (leagueVersion) =>
  axios
    .get(
      `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/data/en_US/champion.json`
    )
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
