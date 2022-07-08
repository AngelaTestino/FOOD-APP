import logoNav from "../logoFOOD.png"
import "./NavBar.css"
import {NavLink} from "react-router-dom"

export default function NavBar(){
    return (
        <>
            <div className="containNav">
                <NavLink to="/home"><img className="logoNav"src={logoNav} alt="logoNav" /></NavLink>
                <ul>
                    <NavLink className="linkNav" to="/home/recipes" ><li className="liNav">Recipes</li></NavLink>
                    <NavLink  className="linkNav"to="/home/diets"><li className="liNav">Diets</li></NavLink>
                    <NavLink  className="linkNav"to="/home/recipes/create"><li className="liNav">Create Recipe</li></NavLink>
                </ul>
            </div>
            


        </>
    )
}