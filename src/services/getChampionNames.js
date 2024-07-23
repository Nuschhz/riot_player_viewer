export const getMasteryChampionNames = (championsList, championId) => {
  const keyNames = Object.keys(championsList);
  let masteryNames = [];
  for (let i = 0; i < championId.length; i++) {
    for (let j = 0; j < keyNames.length; j++) {
      let champion = keyNames[j];
      if (championsList[champion].key === championId[i].championId.toString()) {
        masteryNames.push({
          championDataName: championsList[champion].id.replaceAll(" ", ""),
          championName: championsList[champion].name,
        });
      }
    }
  }
  return masteryNames;
};

export const getMatchChampionNames = (championsList, championId) => {
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
