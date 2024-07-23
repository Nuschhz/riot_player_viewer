import axios from "axios";

export const getUserProfileData = (
  user,
  tag,
  server,
  currentUser,
  leagueVersion
) =>
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
