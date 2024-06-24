import '../styles/UserData.css'

import { useContext } from "react"
import { SearchContext } from "../context/SearchContext"

export default function UserData (){

    const {currentUser} = useContext(SearchContext)
    
    const ExistData = () => {
        return (
            <div className='UserDataContainer'>
                <div className='UserData'>
                    icon
                    <div>
                        {currentUser.username}
                        Level
                    </div>
                </div>
                <div className='UserRank'>
                    Elo
                    LP
                </div>
                <div className='UserMasteries'>
                    Champion
                    Mastery level
                    Champion
                    Mastery level
                    Champion
                    Mastery level
                </div>
                <div className='Exp'>
                    EXP: 0 / 100
                <div/>
                </div>
            </div>
        );
    }

    const NoData = () => {
        return <></>
    }

    return(
        <>
        {currentUser.exist ? <ExistData/>:<NoData/>}
        </>
    )
}