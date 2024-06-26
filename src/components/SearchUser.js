import '../styles/SearchUser.css'

import axios from 'axios';
import { useState, useContext } from "react";
import { SearchContext } from '../context/SearchContext';
import { ThemeContext } from '../context/ThemeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/fontawesome-free-solid'


export default function SearchUser(){

    const {currentUser, setCurrentUser} = useContext(SearchContext)
    const {theme} = useContext(ThemeContext)

    const [isSelected, setIsSelected] = useState(false)
    const [user, setUser] = useState("")
    const [tag, setTag] = useState("")

    const handleCallUser = async () => {

        const leagueVersion = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then(res => res.data[0])
        .catch(err => console.log(err))

        await axios.get('http://localhost:4000/SummonerProfile', { params: { username: user, tagline: tag } } )
       .then((res)=> {
        setCurrentUser({
            puuid: res.data.puuid,
            username: user,
            tagline: tag,
            icon: `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/profileicon/${res.data.profileIconId}.png`,
            level: res.data.summonerLevel,
            exist: true,
          })
        })
        .catch(err => console.log(err))

        await axios.get('http://localhost:4000/SummonerMastery', { params: { puuid: currentUser.puuid } } )
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err))
        
        console.log(currentUser)
    }

    const handleSelectServer = () => {
        setIsSelected(!isSelected)
    }

    return(
        <div className="SearchContainer" style={{border: "solid",  borderImage: theme.gradientGold, backgroundColor: theme.background}}>
            <div>
                <span>Servers</span>
                <button  className='ServerButton' onClick={handleSelectServer}><span>BR1</span>{ isSelected ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp}/>}</button>
            </div>

            <div>
                <span>Username</span>
                <input placeholder="Username" onChange={(e) => setUser(e.target.value)}/>
            </div>

            <div>
                <span>Tagline</span>
                <input placeholder="Tagline" onChange={(e) => setTag(e.target.value)}/>
            </div>

            <div>
                <button className='SearchButton' onClick={handleCallUser}><FontAwesomeIcon icon={faSearch} color={theme.secondary} size='lg'/></button>
            </div>
        </div>
    )
}