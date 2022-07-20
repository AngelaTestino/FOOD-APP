import {fetch} from 'cross-fetch';


export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const RECETA_CACHE = 'RECETA_CACHE';
export const RECETA_ORDER = 'RECETA_ORDER';
export const RECIPE_ID = 'RECIPE_ID';
export const ERROR = 'ERROR';
export const GET_DIETS = 'GET_DIETS';


export const getAllRecipes = (name) => (dispatch) => {
    if (name){
      return  fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(response => response.json())
        .then(data =>{
            console.log({data})
            if(data.message){
                dispatch({ type: RECETA_CACHE, payload: [] })
                dispatch({ type: ERROR, payload: true })
            }
            else{
                dispatch({ type: GET_ALL_RECIPES, payload: data })
                dispatch({ type: ERROR, payload: false })
            }
            
            })
        .catch(err =>console.log(err.message))
        
      
    }
    return fetch('http://localhost:3001/recipes')
    .then(response => response.json())
    .then(data => {
        dispatch({ type: GET_ALL_RECIPES, payload: data })
        dispatch({ type: ERROR, payload: false })  });
   
    
};

export const createRecipe = (form) => (dispatch) => {
   return fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => dispatch({ type: CREATE_RECIPE, payload: data }));
}

export const filtrarRecipe=(data)=>{
    return { type: RECETA_CACHE, payload: data }}


export const recetaCache=(data)=>{
    return { type: RECETA_CACHE, payload: data}
}

export const recetaOrder=(data)=>{
    return {
        type: RECETA_ORDER, payload: data 
    }}

export const recipeID=(data)=>(dispatch)=>{
    return fetch(`http://localhost:3001/recipes/${data}`)
    .then(response => response.json())
    .then(data => dispatch({ type: RECIPE_ID, payload: data }));
}

export const diets=()=>(dispatch)=>{
    return fetch('http://localhost:3001/diets')
    .then((response)=>response.json())
    .then(data=>dispatch({type:GET_DIETS,payload:data}))




}
