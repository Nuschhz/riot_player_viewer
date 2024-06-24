import "../styles/GameSelector.css"

export default function GameSelector({name, image, style, onMouseEnter, onMouseLeave}){

    return(
        <div className="GameSelector" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <img src={image} alt={name} height={'45px'}></img>
        </div>
    )
}