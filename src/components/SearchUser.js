import '../styles/SearchUser.css'

import axios from 'axios'

import { useState, useContext } from "react";
import { SearchContext } from '../context/SearchContext';
import { ThemeContext } from '../context/ThemeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/fontawesome-free-solid'


export default function SearchUser(){

    const {setCurrentUser} = useContext(SearchContext)
    const {theme} = useContext(ThemeContext)

    const [isSelected, setIsSelected] = useState(false)
    const [server, setServer] = useState({serverName: "BR1",serverIndex: 0, continentIndex: 0})
    const [user, setUser] = useState("")
    const [tag, setTag] = useState("")

    const servers = []

    const getLeagueVersion = () => axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then(res => res.data[0])
    .catch(err => console.log(err))

    const getChampionNames = (championsList, masteries) => {

        const keyNames = Object.keys(championsList);
        let masteryNames = [];

        for(let i = 0; i < masteries.length; i++){
            for (let j = 0; j < keyNames.length; j++) { 
                let champion = keyNames[j]
                if (championsList[champion].key === masteries[i].championId.toString()) {
                    masteryNames.push({championDataName: championsList[champion].id.replaceAll(" ",""), championName: championsList[champion].name})
                }
            }
        }
        
        return masteryNames;
    };
    
    const getChampionsList = (leagueVersion) => axios.get(`https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/data/en_US/champion.json`)
        .then(res => res.data.data)
        .catch(err => console.log(err))

    const getUserProfileData = (leagueVersion) => axios.get('http://localhost:4000/SummonerProfile', {params:{username: user, tagline: tag, continent: server.continentIndex, server: server.serverIndex}})
    .then((res)=> {
        const profile = {
            puuid: res.data.puuid,
            username: user,
            tagline: tag,
            icon: `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/profileicon/${res.data.profileIconId}.png`,
            level: res.data.summonerLevel,
            exist: true,
          }
        return profile
     })
     .catch(err => console.log(err))

     const getMastery = (userData) => axios.get('http://localhost:4000/SummonerMastery', {params:{puuid: userData.puuid, server: server.serverIndex}})
     .then((res) => res.data)
     .catch(err => console.log(err))


    const handleCallUser = async () => {
        const leagueVersion = await getLeagueVersion()
        const userData = await getUserProfileData(leagueVersion)
        const masteries = await getMastery(userData)
        const championsList = await getChampionsList(leagueVersion)
        const championNames = getChampionNames(championsList, masteries)
        setCurrentUser({...userData, mastery: {name: championNames, masteries: masteries}})
    }

    const handleSelectServer = () => {
        setIsSelected(!isSelected)
    }


    return(
        <div className="SearchContainer" style={{border: "solid",  borderImage: theme.gradientGold, backgroundColor: theme.background}}>
            <div style={{color: theme.displayColor}}>
                <span>Server</span>
                <button style={{color: theme.displayColor}} className='ServerButton' onClick={handleSelectServer}><span>{server.serverName}</span>{ isSelected ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp}/>}</button>
            </div>

            <div style={{color: theme.displayColor}}>
                <span>Username</span>
                <input style={{color: theme.displayColor}} placeholder="Username" onChange={(e) => setUser(e.target.value)} maxLength={16} className='SearchInput'/>
            </div>

            <div style={{color: theme.displayColor}}>
                <span>Tagline</span>
                <div>
                <span style={{color: theme.gray}}>#</span><input style={{color: theme.displayColor}} placeholder="Tagline" onChange={(e) => setTag(e.target.value)} maxLength={5} className='SearchInput'/>
                </div>
            </div>

            <div>
                <button className='SearchButton' onClick={handleCallUser}><FontAwesomeIcon icon={faSearch} color={theme.secondary} size='lg'/></button>
            </div>
        </div>
    )
}