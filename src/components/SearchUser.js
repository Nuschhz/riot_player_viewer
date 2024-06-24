import '../styles/SearchUser.css'

import axios from 'axios';
import { useState, useContext } from "react";
import { SearchContext } from '../context/SearchContext';

export default function SearchUser(){

    const [isSelected, setIsSelected] = useState(false)
    const [user, setUser] = useState("")
    const [tag, setTag] = useState("")
    const {setCurrentUser} = useContext(SearchContext)
    
    const handleCallUser = () => {
        axios.get('http://localhost:4000/LeagueMatches', {params: { username: user, tagline: tag} } )
       .then(res => console.log(res))
       .then(()=> {
        setCurrentUser({
            username: user,
            tagline: tag,
            icon: null,
            exist: true,
          })
        })
       .catch(err => console.log(err))

    }

    const handleSelectServer = () => {
        setIsSelected(!isSelected)
    }

    return(
        <div className="SearchContainer">
            <div>
                <span>Servers</span>
                <button onClick={handleSelectServer}>{isSelected? <span>BR1 ^</span> :  <span>BR1 v</span> }</button>
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
                <span>Search</span>
                <button onClick={handleCallUser}>icon</button>
            </div>
        </div>
    )
}