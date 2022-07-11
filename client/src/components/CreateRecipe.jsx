import "./CreateRecipe.css";

export default function CreateRecipe(){
    return (
        <>
        <div className="formulario">
        <form>
            <div className="eachContainer">
            <label className="labelForm">Name:</label>
            <input className="inputForm" type="text" />
            </div>
            <div className="eachContainer">
            <label className="labelForm">Summary:</label>
            <input className="inputForm" type="text" />
            </div>
            <div className="eachContainer">
            <label className="labelForm">Health Score:</label>
            <input className="inputForm" type="text" />
            </div>
            <div className="eachContainer">
            <label className="labelForm">Type of diet:</label>
            <select multiple={true} name="diets" >
              
                <option value={2}>Vegetarian</option>
                <option value={3}>Vegan</option>
                <option value={4}>Pescetarian</option>
                <option value={5}>Gluten Free</option>
                <option value={6}>Dairy Free</option>
                <option value={7}>Ketogenic</option>
                <option value={8}>Lacto-Vegetarian</option>
                <option value={9}>Ovo-Vegetarian</option>
                <option value={10}>Paleo</option>
                <option value={11}>Primal</option>
                <option value={12}>Whole30</option>






            </select>
            </div>
            <div className="eachContainer">
            <label className="labelForm">Instructions:</label>
            <input className="inputForm" type="text" />
            </div>
            <button className="btnCreate" type="submit">Create</button>


        </form>
        </div>
        
        
        
        
        
        </>
    )

}