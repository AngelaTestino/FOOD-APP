import {connect} from "react-redux";
import Recipe from "./Recipe.jsx";
import {getAllRecipes} from "../redux/actions.js";
import {useEffect} from "react";
function Recipes({recipes,getAllRecipes}){
useEffect(()=>getAllRecipes(),[])

    return(
        <>
        
        <div>
            {recipes && recipes.map((recipe)=><Recipe key={recipe.id} {...recipe}/>)}
        </div>
        </>
    )
}

const mapStateToProps=(state) =>{
    return {
        recipes: state.recipes
    }

    
}
const mapDispatchToProps=(dispatch) =>{
    return {
        getAllRecipes: () => dispatch(getAllRecipes())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
