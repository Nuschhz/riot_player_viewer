import "../styles/GameSelector.css"

import { useState } from "react"

export default function GameSelector({name, image, color}){

    const [backgroundColor, setBrackgroundColor] = useState({backgroundColor: "transparent"})

    const handleMouseEnter = () => {
        setBrackgroundColor({backgroundColor: color})
    }
    const handleMouseLeave = () => {
        setBrackgroundColor({backgroundColor: "transparent"})
    }

    return(
        <div className="GameSelector" style={backgroundColor} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={image} alt={name} height={'45px'}></img>
        </div>
    )
}