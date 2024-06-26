import Header from "../components/Header";
import SearchUser from "../components/SearchUser";
import UserData from "../components/UserData";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import '../styles/Menu.css'

export default function Menu(){
    
    const {theme} = useContext(ThemeContext)

    return(
    <div>
       <Header/>
        <div className="background" style={{backgroundColor: theme.background}}>
            <SearchUser/>
            <UserData/>
        </div>
    </div>
    )
}