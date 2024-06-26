import '../styles/UserData.css'

import { useContext } from "react"
import { SearchContext } from "../context/SearchContext"
import { ThemeContext } from '../context/ThemeContext'

export default function UserProfile () {

    const {currentUser} = useContext(SearchContext)
    const {theme} = useContext(ThemeContext)
    
    //colocar imagem do campeão

    return(
        <div className='UserDataContainer'>
                <div>
                <div className='UserProfile' style={{border: "solid",  borderImage: theme.gradientGold, backgroundColor: theme.background, color: theme.secondary}}>
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
                
                </div>
                <div className='UserMasteries'>
                    {/* Champion
                    Mastery level
                    Champion
                    Mastery level
                    Champion
                    Mastery level */}
                </div>
            </div>
    )
}