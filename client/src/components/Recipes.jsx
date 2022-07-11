import { useDispatch, useSelector} from "react-redux";
import Recipe from "./Recipe.jsx";
import {getAllRecipes} from "../redux/actions.js";
import React,{useEffect,useState} from "react";
import "./Recipes.css"



export default function Recipes(){

    const dispatch=useDispatch();
    let recipes=useSelector(state=>state.recipes)
    const [btnNext,setBtnNext]=useState(false)
    const [btnPrev,setBtnPrev]=useState(true)
    
    const[currentPage,setCurrentPage]=useState(0);

    function prevHandler(){
        if(currentPage===0){
            setBtnPrev(true)
        }
        setBtnNext(false)
        if(currentPage>0){
            
            setCurrentPage((currentPage)=>currentPage-9);
        }



    }
    function nextHandler(){
        setBtnPrev(false)
        if(recipes.length-(currentPage+9)<=9){
            setBtnNext(true)
    
        }
        setCurrentPage((currentPage)=>currentPage+9)

    }

    useEffect(()=>{
    getAllRecipes()(dispatch)

    
    },[dispatch]) 


    




    return(
        <>

        <div className="mainRecipes">
        <div className="containerRecipes">
        
        {recipes && recipes.slice(currentPage,currentPage+9).map((recipe)=><Recipe key={recipe.id}  {...recipe}/>)}
        </div>
      
        <button className="btnPaginado" onClick={prevHandler}disabled={btnPrev}>Previous</button>
       
        <button className="btnPaginado" onClick={nextHandler}disabled={btnNext}>Next</button>
        </div>

        </>
    )
}

/*const mapStateToProps=(state) =>{
    return {
        recipes: state.recipes
    }

    
}
const mapDispatchToProps=(dispatch) =>{
    return {
        getAllRecipes: () => getAllRecipes(dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes)*/
