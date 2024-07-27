import axios from "axios";

export const getMastery = (userData, server) =>
  axios
    .get(`https://riot-server.vercel.app/SummonerMastery`, {
      params: {
        puuid: userData.puuid,
        server: server.serverIndex,
        apiKey: process.env.REACT_APP_RIOT_API,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
