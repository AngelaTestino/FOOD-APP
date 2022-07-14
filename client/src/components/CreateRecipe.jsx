import "./CreateRecipe.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createRecipe} from "../redux/actions";
import image from "../fondoCreate.jpeg"



 const options = [
    {value: '', text: '--Choose one or multiple options--'},
    {value: '1', text: 'Gluten Free'},
    {value: '2', text: 'Ketogenic'},
    {value: '3', text: 'Vegetarian'},
    {value: '4', text: 'Lacto-Vegetarian'},
    {value: '5', text: 'Ovo-Vegetarian'},
    {value: '6', text: 'Vegan'},
    {value: '7', text: 'Pescetarian'},
    {value: '8', text: 'Paleo'},
    {value: '9', text: 'Primal'},
    {value: '10', text: 'Low FODMAP'},
    {value: '11', text: 'Whole30'},
    {value: '12', text: 'Dairy free'},
    {value: '13', text: 'Omnivore'},
    {value: '14', text: 'Clean Eating'},
    {value: '15', text: 'Mediterranean'},
    {value: '16', text: 'Grain Free'},
    {value: '17', text: 'Fruitarian'}]
    export const opciones=options.slice(1)

    const initialState={
        title:'',
        summary:'',
        healthScore:0,
        steps:'',
        image:'',
        diets:[]
    }
// eslint-disable-next-line
const regExTitle=/[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/ 
// eslint-disable-next-line
const regExImage=/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

export function CreateRecipe(){

    const[form,setForm]=useState(initialState)
    const[create,setCreate] = useState('')
    const [errorTitle, setErrorTitle] = useState('');
    const [errorSummary, setErrorSummary] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [btn,setBtn]=useState(true);
    

    const dispatch = useDispatch();

    const handleTitle=(e)=>{
        e.preventDefault()
        setCreate('');
        setBtn(false)
    if(e.target.value===''){
        setErrorTitle('Name is required')
         return setForm({...form,title:e.target.value})
    }
        if(!regExTitle.test(e.target.value)){
            setErrorTitle('Name must contain only letters!!!')
        }else{
            setErrorTitle('') 
        }
        setForm({...form,title:e.target.value})
    }
    const handleSummary=(e)=>{
        e.preventDefault()
        setCreate('')
        setBtn(false)
        if(e.target.value===''){
            setErrorSummary('Summary is required')
            return setForm({...form,summary:e.target.value})
        }
        setForm({...form,summary:e.target.value})
        setErrorSummary('')
    }
    const handleImage=(e)=>{
        e.preventDefault()
        setCreate('')
        setBtn(false)

        if(e.target.value===''){
        setErrorImage('') 
        return setForm({...form,image:e.target.value})}
        if(!regExImage.test(e.target.value)){
            setErrorImage('Image must be a valid URL!!!')
        }
        else{setErrorImage('') }

        setForm({...form,image:e.target.value})
    }

    const handleChange=(e)=>{
        e.preventDefault()
        setCreate('')
        setBtn(false)
        setForm({...form,[e.target.name]:e.target.value});

        }
    const handleSelect=(e)=>{
        e.preventDefault()
        setCreate('')
        setBtn(false)
        setForm({...form,[e.target.name]:[...e.target.selectedOptions].map(o => o.value)});
    }
            
    const handleSubmit=(e)=>{
    e.preventDefault()
  
    
    if(errorTitle==='' && errorSummary==='' &&errorImage==='' && form.title!=='' && form.summary!=='') {
        
        createRecipe(form)(dispatch)
        setCreate('The recipe was created successfully')
        setForm(initialState)
        setBtn(true)
    }
   
    setBtn(true)
    }

    

    
    return (
        <>
        <div className="mainCreateRecipe" style={{backgroundImage: 'url(https://th.bing.com/th/id/R.d35ce6ac6dec7424489d5a3195442db9?rik=boWwkump6Yg7qw&riu=http%3a%2f%2fwww.irisfmg.com%2fimg%2ftextures%2fbig%2fstream%2fwheat.jpg&ehk=jJyLNcYc%2bQ5rp%2btz2gIUfMNcrulUMXKvWGB43Atdg0Q%3d&risl=&pid=ImgRaw&r=0)'}}>
        <div className="formulario">
        <form onSubmit={handleSubmit}>
            <div className="eachContainer">
            <label className="labelForm">Name:</label>
            <input className={!errorTitle?"inputForm":"danger"} name="title" type="text" value={form.title} onChange={handleTitle}/>
            </div>
            {!errorTitle? null : <span className="msgError">{errorTitle}</span>}
            <div className="eachContainer">
            <label className="labelForm">Summary:</label>
            <input className={!errorSummary?"inputForm":"danger"} name="summary"type="text" value={form.summary}onChange={handleSummary}/>
            </div>
            {!errorSummary? null : <span className="msgError">{errorSummary}</span>}
            <div className="eachContainer">
            <label className="labelForm">Health Score:</label>
            <input className="inputForm" name="healthScore" type="number"value={form.healthScore} min={1} max={20}onChange={handleChange} />
            </div>
    
            <div className="eachContainer">
            <label className="labelForm">Type of diet:</label>
                <select name="diets" className="selectForm" multiple={true} value={form.diets} onChange={handleSelect}>

                {options.map(option => ( option.value?<option key={option.value} value={option.value}>{option.text}</option>: <option key={option.value} value={option.value} disabled={true}>{option.text}</option>))}

                </select>
            </div>
            <div className="eachContainer">
            <label className="labelForm">Instructions:</label>
            <input className="inputForm" name="steps" type="text" value={form.steps}onChange={handleChange}/>
            </div>
            <div className="eachContainer">
            <label className="labelForm">URL Image:</label>
            <input className={!errorImage?"inputForm":"danger"} name="image" type="text" value={form.image} onChange={handleImage}/>
            </div>
            {!errorImage? null : <span className="msgError">{errorImage}</span>}
            <button className="btnCreate" type="submit" disabled={btn}>Create</button>


        </form>
        </div>
        
        <div className="created">
            {create && <h2>{create}</h2>}
        </div>
        
        
        </div>
        </>
    )

}