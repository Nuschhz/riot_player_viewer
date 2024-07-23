import axios from "axios";

export const getMatches = (userData, server) =>
  axios
    .get("http://localhost:4000/LeagueMatches", {
      params: { puuid: userData.puuid, continent: server.continentIndex },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
