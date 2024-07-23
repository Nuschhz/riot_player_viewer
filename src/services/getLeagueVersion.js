import axios from "axios";

export const getLeagueVersion = () =>
  axios
    .get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((res) => res.data[0])
    .catch((err) => console.log(err));
