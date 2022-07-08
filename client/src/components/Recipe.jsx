import { NavLink } from "react-router-dom"

export default function Recipe({id,image,title,diets}){
    return (
        <>
        <div>
            <NavLink to={`/home/recipes/${id}`}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            </NavLink>
            <p>Tipo de dieta: {diets && diets.join(', ')}</p> 

        </div>
        </>
    )
}