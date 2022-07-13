import {fetch} from 'cross-fetch';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';



export const getAllRecipes = (name) => (dispatch) => {
    if (name){
        return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(response => response.json())
        .then(data => dispatch({ type: GET_ALL_RECIPES, payload: data }));
    }
    return fetch('http://localhost:3001/recipes')
    .then(response => response.json())
    .then(data => dispatch({ type: GET_ALL_RECIPES, payload: data }));

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

