import logoNav from "../logoFOOD.png"
import "./NavBar.css"
import {NavLink} from "react-router-dom"
import {useLocation} from "react-router-dom"

import Search from "./Search.jsx"

export default function NavBar(){
const {pathname}=useLocation()



    return (
        <>
            <header className="containNav">
                <NavLink to="/home"><img className="logoNav"src={logoNav} alt="logoNav" /></NavLink>
                <ul>
                    <NavLink className="linkNav"  to="/home/recipes" ><li className="liNav">Recipes</li></NavLink>
                    <NavLink  className="linkNav" to="/home/diets"><li className="liNav">Diets</li></NavLink>
                    <NavLink  className="linkNav" to="/home/createRecipe"><li className="liNav">Create Recipe</li></NavLink>
                </ul>
                {pathname==='/home/recipes'&& <Search/>}
            </header>

            


        </>
    )
}