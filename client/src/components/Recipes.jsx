import { useDispatch, useSelector} from "react-redux";
import Recipe from "./Recipe.jsx";
import {getAllRecipes} from "../redux/actions.js";
import React,{useEffect,useState} from "react";
import "./Recipes.css"



export default function Recipes(){

    const dispatch=useDispatch();
    let recipes=useSelector(state=>state.recipes)
    const [allRecipes,setAllRecipes]=useState([]);
    //const[currentPage,setCurrentPage]=useState(0);
    
    
    const[items,setItems]=useState([]);


    const prevHandler=()=>{//items=los ultimos elementos de la lista
        if(recipes.length===0){
            recipes=allRecipes;
            recipes.splice(-items.length)
        }
        if(recipes.length>0 && recipes.length<9){
            
            setItems(recipes.splice(-recipes.length));
        }
        if(recipes.length>=9){setItems(recipes.splice(-9))}
        
    }
    function nextHandler(){
    if(recipes.length===0){
        
            recipes=allRecipes;
            setItems(recipes.splice(0,9));
        setAllRecipes(items);}
    if(recipes.length>0 && recipes.length<9){
        setItems(recipes.splice(0,recipes.length));}
    if(recipes.length>=9){setItems(recipes.splice(0,9));}
        setAllRecipes(prevAllRecipes=>[...prevAllRecipes,...items]);


    }
    useEffect(()=>{
    getAllRecipes()(dispatch)

    
    },[dispatch]) 


    useEffect(()=>{
        setItems(recipes.splice(0,9));
        // eslint-disable-next-line

    },[recipes])
    useEffect(()=>{
        setAllRecipes(items);
        //setPagina(1)
        // eslint-disable-next-line
    },[])

 
  

    return(
        <>

        <div className="mainRecipes">
        <div className="containerRecipes">
        
        {items && items.map((recipe)=><Recipe key={recipe.id}  {...recipe}/>)}
        </div>
        
        <button className="btnPaginado" onClick={prevHandler}>Previous</button>
   
        <button className="btnPaginado" onClick={nextHandler}>Next</button>
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
