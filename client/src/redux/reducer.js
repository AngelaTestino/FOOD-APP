
import {GET_ALL_RECIPES,CREATE_RECIPE,RECETA_CACHE} from "./actions";


const initialState={
    recipes:[],
    recetaCache:[],
    recipe:{},
    diets:[],
    create:{}
}


const reducer=(state=initialState,action)=>{

    switch(action.type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes:action.payload
            }
        case CREATE_RECIPE:
            return{
                ...state,create:action.payload
            }
        case RECETA_CACHE:
            return{ ...state,
                recetaCache:action.payload}
        default:
            return state
    }
}
export default reducer;