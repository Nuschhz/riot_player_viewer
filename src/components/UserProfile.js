import '../styles/UserData.css'

import { useContext } from "react"
import { SearchContext } from "../context/SearchContext"

export default function UserProfile () {

    const {currentUser} = useContext(SearchContext)

    return(
        <div className='UserDataContainer'>
                <div>
                <div className='UserProfile'>
                    <img src={currentUser.icon} alt={currentUser.username + 'icon'}/>
                    <div>
                        <span>
                        {currentUser.username}
                        </span>
                        <span>
                        Nível {currentUser.level}
                        </span>
                    </div>
                </div>
                <div className='UserRank'>
                    <img src={currentUser.icon} alt={currentUser.username + 'icon'}/>
                    <span>Elo Name</span>
                    <span>LP</span>
                </div>
                </div>
                <div className='UserMasteries'>
                    Champion
                    Mastery level
                    Champion
                    Mastery level
                    Champion
                    Mastery level
                </div>
            </div>
    )
}