
import "./Search.css"
import { useDispatch} from "react-redux";
import React,{useState} from "react"
import { getAllRecipes } from "../redux/actions";


export default function Search(){
    
    const [name,setName]=useState("")
    const dispatch=useDispatch();
    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value) 
       

    }
    function handleSubmit(e){
        e.preventDefault();
 
        getAllRecipes(name)(dispatch)
       
        setName("")

    } 
        
    
    return(
        <>
        <div className="formContainer">
        <form  onSubmit={(e) => handleSubmit(e)}>

            <input
            type="text"
            className="titleLabel"
            name="search"
            value={name}
            placeholder="Search for a recipe..."
            onChange={(e) =>handleChange(e)}
            />
        
        <button className="btn-Search" type="submit">Search</button>
        </form>
        </div>
        
        </>
    )
}