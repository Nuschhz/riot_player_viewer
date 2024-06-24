import GameSelector from "./GameSelector";
import '../styles/Header.css'
import LOLLogo from '../images/LOL.png'
import VLRLogo from '../images/VLR.png'
import TFTLogo from '../images/TFT.png'
import { useState } from "react";

export default function Header(){
    
    const [colorVal, setColorVal] = useState({backgroundColor: "transparent"})
    const [colorLol, setColorLol] = useState({backgroundColor: "transparent"})
    const [colorTft, setColorTft] = useState({backgroundColor: "transparent"})

    const handleMouseEnter = (gameColor, index) => {
        switch(index){
            case 0:
                setColorVal({backgroundColor: gameColor})
                break
            case 1:
                setColorLol({backgroundColor: gameColor})
                break
            case 2:
                setColorTft({backgroundColor: gameColor})
                break
            default:
                setColorVal({backgroundColor: "transparent"})
                setColorLol({backgroundColor: "transparent"})
                setColorTft({backgroundColor: "transparent"})
        }
    }

    const handleMouseLeave = (index) => {
        switch(index){
            case 0:
                setColorVal({backgroundColor: "transparent"})
                break
            case 1:
                setColorLol({backgroundColor: "transparent"})
                break
            case 2:
                setColorTft({backgroundColor: "transparent"})
                break
            default:
                setColorVal({backgroundColor: "transparent"})
                setColorLol({backgroundColor: "transparent"})
                setColorTft({backgroundColor: "transparent"})
        }
    }

    return (
    <header className="headerContainer">
        <GameSelector name={'VALORANT'} image={VLRLogo} style={colorVal} onMouseEnter={() => handleMouseEnter("#FA4454", 0)} onMouseLeave={() => handleMouseLeave(0)}/>
        <GameSelector name={'League of Legends'} image={LOLLogo} style={colorLol} onMouseEnter={() => handleMouseEnter("#0397AB", 1)} onMouseLeave={() => handleMouseLeave(1)}/>
        <GameSelector name={'Teamfight Tactics'}  image={TFTLogo} style={colorTft} onMouseEnter={() => handleMouseEnter("#F7AD3E", 2)} onMouseLeave={() => handleMouseLeave(2)}/>
    </header>
    )
}