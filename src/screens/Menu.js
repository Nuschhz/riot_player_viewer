import Header from "../components/Header";
import SearchUser from "../components/SearchUser";
import UserData from "../components/UserData";
import '../styles/Menu.css'

export default function Menu(){
    return(
    <div>
       <Header/>
        <div className="background">
            <SearchUser/>
            <UserData/>
        </div>
    </div>
    )
}