import React,{useEffect} from "react"
import "./DetailRecipe.css";
import {useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { recipeID } from "../redux/actions";
import{NavLink} from "react-router-dom"


//traer el estado recipe
export default function DetailRecipe() {

    let {id}=useParams();
    let recipe=useSelector(state=>state.recipe);

    const dispatch=useDispatch();
    useEffect(()=>{
        recipeID(id)(dispatch)

    },[dispatch,id])
  
    

return (
    <>
    <div className="containerDetail">
        <div className="overlapping">
        <div className="left" style={{backgroundImage:`url(${recipe.image})` }}>
            <div className="overlayDetail"></div>
            </div>
        <div className="right">
        <div className="containImg">
 
        <h1>{recipe.title}</h1>
        {recipe.diets && <p>Type of Diets: {recipe.diets.join(', ')}</p> }
        <p>Heath Score: {recipe.healthScore}</p>
        </div>
        </div></div>
    </div>
    
        <div class="wave-animation"> 
        
        <div class="wave">
            
        </div>
        </div>
        <div className="preparation">
            <div className="resumen">
        {recipe.summary && 
        <p className="parrafo">
            <h2>Summary</h2>
          
            <div className="html"dangerouslySetInnerHTML={{ __html:recipe.summary}}/>

        </p>}</div>
        <div className="resumen">
        {recipe.steps && 
            <p className="steps">
            <h2>Steps </h2>
            <div className="html" dangerouslySetInnerHTML={{ __html:recipe.steps}}/>
            </p>}</div>
            <NavLink to='/home/recipes'><button className="btn">Volver</button></NavLink>
            </div>
       
       
    </>

)


}