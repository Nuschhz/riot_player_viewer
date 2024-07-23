import axios from "axios";

export const getMastery = (userData, server) =>
  axios
    .get("http://localhost:4000/SummonerMastery", {
      params: { puuid: userData.puuid, server: server.serverIndex },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
