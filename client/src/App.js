import './App.css';
import{Route,Redirect} from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import NavBar from './components/NavBar.jsx'
import Recipes from './components/Recipes.jsx'
import {CreateRecipe} from './components/CreateRecipe.jsx'
import DetailRecipe from './components/DetailRecipe.jsx'
import Diets from './components/Diets';


function App() {

  return (
    
    <div className="App">
      
      
      <Route exact path='/'render={()=><Landing/>}/>
      
      <Route path='/home' render={()=><NavBar/>}/> 
      <Route exact path='/home' render={()=><Home/>}/>

      
      <Route exact path='/home/recipes' render={()=><Recipes/>}/>
      <Route exact path='/home/recipes/:id' render={()=><DetailRecipe/>}/>
      <Route exact path='/home/createRecipe' render={()=><CreateRecipe/>}/>
      <Route exact path='/home/diets' render={()=><Diets/>}/>
      {/*<Redirect to='/'/>*/}
  
    
      


      </div>
  );
}

export default App;
