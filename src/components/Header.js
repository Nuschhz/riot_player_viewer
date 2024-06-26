// import GameSelector from "./GameSelector";
import '../styles/Header.css'
// import LOLLogo from '../images/LOL.png'
// import VLRLogo from '../images/VLR.png'
// import TFTLogo from '../images/TFT.png'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Header(){

    const {theme} = useContext(ThemeContext)

    return (
    <header className="headerContainer" style={{backgroundColor: theme.background, borderBottom: `1px solid ${theme.secondary}`, color: theme.displayColor}}>
        {/* <GameSelector name={'VALORANT'} image={VLRLogo} color={"#FA4454"}/>
        <GameSelector name={'League of Legends'} image={LOLLogo} color={"#0397AB"}/>
        <GameSelector name={'Teamfight Tactics'}  image={TFTLogo} color={"#F7AD3E"}/> */}
        SUMMONER PROFILE
    </header>
    )
}