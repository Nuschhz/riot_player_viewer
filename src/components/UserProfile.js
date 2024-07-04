import '../styles/UserData.css'

import { useContext } from "react"
import { SearchContext } from "../context/SearchContext"
import { ThemeContext } from '../context/ThemeContext'

export default function UserProfile () {

    const {currentUser} = useContext(SearchContext)
    const {theme} = useContext(ThemeContext)

    return(
        <div  className='UserDataContainer' style={{backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentUser.mastery.name[0].championDataName}_0.jpg)`, backgroundSize: 'cover', backgroundColor: theme.background}}>
            <div className='LeftWrapper'>
                <div className='UserProfile' style={{border: "solid",  borderImage: theme.gradientGold, backgroundColor: theme.background + 'BF', color: theme.secondary}}>
                    <img src={currentUser.icon} alt={currentUser.username + 'icon'}/>
                    <div>
                        <span>
                        {currentUser.username}
                        </span>
                        <span style={{fontSize: '16px'}}>
                        Nível {currentUser.level}
                        </span>
                    </div>
                </div>
                <div className='UserMasteries'>
                    {
                        currentUser.mastery.name.map((item, index) => {
                            return(
                                <div key={index} >
                                    <div className='UserMastery' style={{backgroundColor: theme.background, border: `solid 2px ${theme.gradientGold}`}}>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${item.championDataName}.png`} alt={item}/>
                                        <div className='UserMasteryLevel' style={{backgroundColor: theme.background, border: `solid 2px ${theme.secondary}`, color: theme.displayColor}}>
                                            {currentUser.mastery.masteries[index].championLevel}
                                        </div>
                                        <div className='UserMasteryName' style={{backgroundColor: theme.background, border: `solid 2px ${theme.secondary}`, color: theme.displayColor}}>
                                            {currentUser.mastery.name[index].championName}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='RightWrapper'>
                <div className='LastRunes' style={{border: "solid",  borderImage: theme.gradientGold, backgroundColor: theme.background + 'BF', color: theme.secondary}}>
                    ultimas runas
                </div>
            </div>
        </div>
    )
}