import { useDispatch, useSelector} from "react-redux";
import Recipe from "./Recipe.jsx";
import {getAllRecipes,filtrarRecipe,recetaCache} from "../redux/actions.js";
import React,{useEffect,useState} from "react";
import "./Recipes.css"
import {opciones} from "./CreateRecipe.jsx"


opciones.unshift({value:'',text:'All'})
//opciones.unshift({value:'',text:'--Type of diet--'})




export default function Recipes(){

    const dispatch=useDispatch();
    let recipes=useSelector(state=>state.recipes)
    let cacheRecipes=useSelector(state=>state.recetaCache)
    const [btnNext,setBtnNext]=useState(false)
    const [btnPrev,setBtnPrev]=useState(true)

    const [selected, setSelected] = useState(opciones[0].value);
   
 
    const[currentPage,setCurrentPage]=useState(0);





    const handlefilter = event => {
        event.preventDefault()
       
       let index = event.target.selectedIndex;
        let valor=event.target.options[index].text
        let recipeFiltered = recipes.filter(recipe => recipe.diets.map((e)=>e.toUpperCase()).includes(valor.toUpperCase()));
    
        if(valor==='All'){
            dispatch(filtrarRecipe(recipes))
            return setSelected(event.target.value)
        }
        dispatch(filtrarRecipe(recipeFiltered))
        setSelected(event.target.value);
        
    };
    
    function prevHandler(){
        if(currentPage===0){
            setBtnPrev(true)
        }
        setBtnNext(false)
        if(currentPage>9){
            setBtnPrev(false)
            setCurrentPage((currentPage)=>currentPage-9);
        }
        if(currentPage===9){
            setBtnPrev(true)
            setCurrentPage((currentPage)=>currentPage-9);
       
        }



    }
    function nextHandler(){
        setBtnPrev(false)
        
        if(cacheRecipes.length-(currentPage+9)<=9){
            setBtnNext(true)
    
        }
        setCurrentPage((currentPage)=>currentPage+9)

    }

    useEffect(()=>{
    getAllRecipes()(dispatch)
   
    },[dispatch]) 

    useEffect(()=>{ 

        dispatch(recetaCache(recipes))
    },[recipes,dispatch])

    useEffect(()=>{

        if(cacheRecipes.length<=9){
            
            setBtnNext(true)
        }else{setBtnNext(false)}
    },[cacheRecipes.length])

 




    return(
        <>

        <div className="mainRecipes">
        <div className="containerInputs">
            <div className="containerFilter">
                <label className="labelFilter">Filter by Diet</label>
                <select name="filterDiet" className="selectRecipes" value={selected} onChange={handlefilter}>

                {opciones.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}

                </select>
            </div>
            <div>
                <label className="labelFilter">Order by</label>
                <input type="number" className="selectRecipes" placeHolder="--Health Score--"min={1} max={20}/>
                <input type="radio" name="fav_language" value="A-Z"/>
                <label for="A-Z" className="labelFilter">A-Z</label>
                <input type="radio" name="fav_language" value="Z-A"/>
                <label for="css" className="labelFilter">Z-A</label>
            </div>
        </div>
        <div className="containerRecipes">
        
        {/*recipes && (value?<Filtrado recipes={recipes} selected ={selected}currentPage={currentPage}/>:recipes.slice(currentPage,currentPage+9).map((recipe)=><Recipe key={recipe.id}  {...recipe}/>))*/}
        {cacheRecipes && cacheRecipes.slice(currentPage,currentPage+9).map((recipe)=><Recipe key={recipe.id}  {...recipe}/>)}



        </div>
      
        <button className="btnPaginado" onClick={prevHandler}disabled={btnPrev}>Previous</button>
       
        <button className="btnPaginado" onClick={nextHandler}disabled={btnNext}>Next</button>
        </div>

        </>
    )
}

