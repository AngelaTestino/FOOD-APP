import { NavLink } from "react-router-dom";
import "./Recipe.css"

export default function Recipe({id,image,title,diets}){
    return (
        <>
        
    
        <NavLink className="linkCard"to={`/home/recipes/${id}`}>
            <div className="containerCard" style={{backgroundImage:`url(${image})`, backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
            <div className="overlayRecipe">
            <h2 className="title">{title}</h2>
        
            <p className="textRecipe">Type of Diets: {diets && diets.join(', ')}</p> 
            
            </div>
            </div>
        </NavLink>

        </>
    )
}