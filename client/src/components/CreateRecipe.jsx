import "./CreateRecipe.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createRecipe} from "../redux/actions";




 const options = [
    {value: '', text: '--Choose one or more(Ctrl) diets--'},
    {value: '1', text: 'gluten free'},
    {value: '2', text: 'ketogenic'},
    {value: '3', text: 'lacto ovo vegetarian'},
    {value: '4', text: 'vegan'},
    {value: '5', text: 'pescatarian'},
    {value: '6', text: 'paleolithic'},
    {value: '7', text: 'primal'},
    {value: '8', text: 'fodmap friendly'},
    {value: '9', text: 'whole 30'},
    {value: '10', text: 'dairy free'}]
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
        setCreate('The recipe was created successfully!')
        setForm(initialState)
        setBtn(true)
    }
   
    setBtn(true)
    }

    

    
    return (
        <>
        <div className="mainCreateRecipe">
        
            
        <div className="formulario">
        <form onSubmit={handleSubmit}>
            <div className="eachContainer">
            <div className="twoInputs">
            <label className="labelForm">Name:</label>
            <input className={!errorTitle?"inputForm":"danger"} name="title" type="text" value={form.title} onChange={handleTitle}/>
            {!errorTitle? null : <span className="msgError">{errorTitle}</span>}
            </div>
            <div className="twoInputs">
            <label className="labelForm">Summary:</label>
            <input className={!errorSummary?"inputForm":"danger"} name="summary"type="text" value={form.summary}onChange={handleSummary}/>
            {!errorSummary? null : <span className="msgError">{errorSummary}</span>}
            </div>
            </div>
            
            <div className="eachContainer">
            <div className="twoInputs">
            <label className="labelForm">Health Score:</label>
            <input className="inputForm" name="healthScore" type="number"value={form.healthScore} placeholder="--0 to 100--"min={1} max={100}onChange={handleChange}/>
            </div>
            <div className="twoInputs">
            <label className="labelForm">URL Image:</label>
            <input className={!errorImage?"inputForm":"danger"} name="image" type="text" value={form.image} onChange={handleImage}/>
            {!errorImage? null : <span className="msgError">{errorImage}</span>}
            </div>
            </div>
    
          
            <div className="ContainDietInstructions">
            <div className="dietInstructions">
            <label className="labelForm">Type of diet:</label>
                <select name="diets" className="selectForm" multiple={true} value={form.diets} onChange={handleSelect}>

                {options.map(option => ( option.value?<option key={option.value} value={option.value}>{option.text}</option>: <option key={option.value} value={option.value} disabled={true}>{option.text}</option>))}

                </select>
                </div>
            <div className="dietInstructions">
            <label className="labelForm">Instructions:</label>
            <textarea className="inputInstruction" name="steps" value={form.steps}onChange={handleChange}/>
            </div>
           
            </div>
            
           
            <button className="btnCreate" type="submit" disabled={btn}>Create</button>
            <div className="created">
            {create && <h2 className="creado">{create}</h2>}
           
            
            
            </div>

        </form>
        </div>
        
        
     
        
        </div>
        </>
    )

}