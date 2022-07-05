const {fetch} = require('cross-fetch');
require('dotenv').config();
const {
    API_KEY
} = process.env;
const { Router } = require('express');
const {Diet, Recipe,Op} = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/recipes', async(req, res) => {
    const {name}=req.query
    let allRecipes=[]
    if(name){
        try{
            const recipes= await Recipe.findAll({where:{
                name:{
                [Op.substring]: `${name}`}
            }})
            
            const response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true&number=100`)
            const data= await response.json()
            //const recipe=await data.results.filter(e=>{
            //return  e.query.toUpperCase().includes(name.toUpperCase())===true}
            
            if(recipes){
                allRecipes=[...recipes]
            }
            if(data.results){
                allRecipes=[...allRecipes,...data.results]
            }
            if(allRecipes.length===0){res.status(404).json({message:'No se encontraron recetas con ese nombre'})}
            res.status(200).json(allRecipes)
        }
        catch(err){
            res.send(err)
        }
    }
    else{
        try{
            const recipes= await Recipe.findAll()
            const response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=false&number=100`)
            const data= await response.json()
            res.status(200).json([...recipes,...data.results])
        }
        catch(err){
            res.send(err)
        }
    }
    
})
router.get('/recipes/:id',async(req,res)=>{
    
    let {id}=req.params

    
        try{
            if(id.includes('-')===false){
            let ID=parseInt(id)
            const response=await fetch(`https://api.spoonacular.com/recipes/${ID}/information?apiKey=${API_KEY}`)
            const data= await response.json()
            if(data){
                return res.status(200).json(data)}}
            
            const receta=await Recipe.findByPk(id)
            if(receta){
                return res.status(200).json(receta)}
        
            //res.status(404).json({message:"No se encontro el receta"})
        
        }
        
        catch(err){  res.send(err)}
    
    
    
})
router.post('/recipes', async(req, res) => {
    const {name,resumen,healthScore,paso,imagen,dieta}=req.body
    try{
        const recipe = await Recipe.create({name,resumen,healthScore,paso,imagen})
        await recipe.addDiet(dieta)
        res.status(201).json(recipe)

    }
    catch(err){
        res.send(err)
    }
})
router.get('/diets', async(req, res) => {
    try{
        let diets = await Diet.findAll()
        res.status(200).json(diets)
    }
    catch(err){
        res.send(err)
    }
})
module.exports = router;
