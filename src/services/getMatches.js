import axios from "axios";

export const getMatches = (userData, server) =>
  axios
    .get(`https://riot-server.vercel.app/LeagueMatches`, {
      params: {
        puuid: userData.puuid,
        continent: server.continentIndex,
        apiKey: process.env.REACT_APP_RIOT_API,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
