import { useDispatch, useSelector} from "react-redux";
import Recipe from "./Recipe.jsx";
import {getAllRecipes,filtrarRecipe,recetaCache,recetaOrder} from "../redux/actions.js";
import React,{useEffect,useState} from "react";
import "./Recipes.css"
import {opciones} from "./CreateRecipe.jsx"
import NotFound from "./NotFound.jsx";


opciones.unshift({value:'',text:'All'})





export default function Recipes(){

    const dispatch=useDispatch();
    let recipes=useSelector(state=>state.recipes)
    let cacheRecipes=useSelector(state=>state.recetaCache)
    let orderRecipes=useSelector(state=>state.recetaOrder)
    let error=useSelector(state=>state.error)

  

    const [btnNext,setBtnNext]=useState(false)
    const [btnPrev,setBtnPrev]=useState(true)
  

    const [selected, setSelected] = useState(opciones[0].value);
    const [radio,setRadio]=useState('')
    const [radioScore,setRadioScore]=useState('')
  
 
    const[currentPage,setCurrentPage]=useState(0);

    

    const hanldeScore=(e)=>{
        let recipesOrder=[]
        if(e.target.value==='menor'){
            recipesOrder=[...cacheRecipes].sort((a,b)=>{return a.healthScore-b.healthScore})
            dispatch(recetaOrder(recipesOrder))
        }
        if(e.target.value==='mayor'){
            recipesOrder=[...cacheRecipes].sort((a,b)=>{return b.healthScore-a.healthScore})
            dispatch(recetaOrder(recipesOrder))
        }


        setRadioScore(e.target.value)
    }


    const handleRadio=(e)=>{
        let recipesOrder=[]
        if(e.target.value==='a'){
            recipesOrder=[...cacheRecipes].sort((a,b)=>{return a.title.localeCompare(b.title, 'es',{sensitivity:'base'}) })
            dispatch(recetaOrder(recipesOrder))

     
        }
        if(e.target.value==='z'){
             recipesOrder=[...cacheRecipes].sort((a,b)=>{return a.title.localeCompare(b.title, 'es',{sensitivity:'base'}) }).reverse()
             dispatch(recetaOrder(recipesOrder))
            
        
        }
    
        setRadio(e.target.value)

        
    }


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
       
        dispatch(recetaOrder(cacheRecipes))
       
    },[cacheRecipes,dispatch])

    useEffect(()=>{

        if(cacheRecipes.length<=9){
            
            setBtnNext(true)
        }else{setBtnNext(false)}
    },[cacheRecipes.length])

 




    return(
        <>
        
        <div className={error?"errorContainer":"mainRecipes"}>
        
        <div className="containerInputs">
            <div className="containerFilter">
                <label className="labelFilter">Filter by Diet</label>
                <select name="filterDiet" className="selectRecipes" value={selected} onChange={handlefilter}>

                {opciones.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}

                </select>
            </div>
            <div>
                <label className="labelFilter">Health Score</label>
                <label className="labelFilter">
                <input type="radio" className="radioInput" value='menor'checked={radioScore==='menor'?true:false} onChange={hanldeScore}/>Menor
                </label>
                <label className="labelFilter">
                <input type="radio" className="radioInput" value='mayor' checked={radioScore==='mayor'?true:false} onChange={hanldeScore}/>Mayor
                </label>
            </div>
            <div>
            <label className="labelFilter">Recipe</label>
                <label className="labelFilter">
                <input type="radio" className="radioInput" value='a' checked={radio==='a'?true:false} onChange={handleRadio} />A-Z
                </label>
                <label className="labelFilter">
                <input type="radio" className="radioInput"value='z' checked={radio==='z'?true:false} onChange={handleRadio}/>Z-A
            
                </label>
            </div>

            
        </div>
        <div className="containerRecipes">
      
        {error && <NotFound/>}
        {cacheRecipes && (orderRecipes?orderRecipes.slice(currentPage,currentPage+9).map((recipe)=><Recipe key={recipe.id}  {...recipe}/>):cacheRecipes.slice(currentPage,currentPage+9).map((recipe)=><Recipe key={recipe.id}  {...recipe}/>))}



        </div>
      
       {error?null:<button className="btnPaginado" onClick={prevHandler}disabled={btnPrev}>Previous</button>}
       
        {error?null:<button className="btnPaginado" onClick={nextHandler}disabled={btnNext}>Next</button>}
        </div>

        </>
    )
}

