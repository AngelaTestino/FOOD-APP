import {NavLink} from "react-router-dom"
import "./Landing.css"
import image  from "../logoFOOD.png"
export default  function Landing(){
    
    return (
        <>  

        <div className='container'>
        <div className='miniContainer'>
        <img className='logo' src={image} alt="Logo" />
        <NavLink to ='/home'>
        <button className='bt'>
            Get Started
        </button></NavLink></div>

        </div>


        </>
    )
}