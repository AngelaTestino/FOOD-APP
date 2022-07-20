import { NavLink } from "react-router-dom";
import "./Recipe.css"

export default function Recipe({id,image,title,diets,healthScore}){
    return (
        <>
        
    
        <NavLink className="linkCard"to={`/home/recipes/${id}`}>
            <div className="containerCard" style={{backgroundImage:`url(${image})`, backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
            <div className="overlayRecipe">
            <p className="title">{title}</p>
        
            {diets && <p className="textRecipe">Type of Diets: {diets.join(', ')}</p> }
            <p className="textRecipe">Heath Score: {healthScore}</p>
            
            </div>
            </div>
        </NavLink>

        </>
    )
}