import './App.css';
import{Route} from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import NavBar from './components/NavBar.jsx'
import Recipes from './components/Recipes.jsx'

function App() {
  return (
    
    <div className="App">
      
      
      <Route exact path='/'render={()=><Landing/>}/>
      <Route path='/home' render={()=><NavBar/>}/>
      <hr />
      <Route exact path='/home' render={()=><Home/>}/>
      <Route path='/home/recipes' render={()=><Recipes/>}/>


      </div>
  );
}

export default App;
