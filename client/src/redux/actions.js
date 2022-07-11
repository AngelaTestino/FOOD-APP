import {fetch} from 'cross-fetch';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';

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


export const ADD_RECIPE = 'ADD_RECIPE';