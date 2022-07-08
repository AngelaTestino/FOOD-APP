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
    let recetaAPI=[]
    const join=[{
        model:Diet,
        attributes:['name'],
        through:{
        attributes:[]}}
    ]
    

        try{
            
            const response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`)
            const data= await response.json()
            
            recetaAPI=data.results.map(e=>{
                return { id:e.id , title: e.title, healthScore: e.healthScore,image: e.image,diets: e.diets}
            })
        
            if(name){
                try{
                const recipesBD= await Recipe.findAll({where:{
                    title:{
                    [Op.substring]: `${name}`}
                },attributes:['id','title','healthScore','image'],include:join})
                

                if(recipesBD){
                    const rBD=recipesBD.map(e=>{
                        return { id:e.id , title: e.title, healthScore: e.healthScore, image: e.image,diets: e.diets.map(d=>d.name)}
                    })
                    allRecipes=[...rBD]
                }
                const recipesAPI= recetaAPI.filter(e=>{
                return  e.title.toUpperCase().includes(name.toUpperCase())===true})
            
                if(recipesAPI){
                    allRecipes=[...allRecipes,...recipesAPI]
                }
                if(allRecipes.length===0){res.status(404).json({message:'No se encontraron recetas con ese nombre'})}
                res.status(200).json(allRecipes)}
                catch(error){
                    res.send(err)
                }

            }
            else{
                try{ let recipesBD= await Recipe.findAll({
                    attributes:['id','title','healthScore','image'],
                    include:join
                })
                
                
                recipesBD=recipesBD.map(e=>{
                    return { id:e.id , title: e.title, healthScore: e.healthScore, image: e.image,diets: e.diets.map(d=>d.name)}
                })
                    
                res.status(200).json([...recipesBD,...recetaAPI])
            }
                catch(error){
                    res.send(err)
                }
            }

            
        }
        catch(err){
            res.send(err)
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
                const recipeAPI={id:data.id,title:data.title,summary:data.summary,healthScore:data.healthScore,steps:data.instructions,image:data.image,diets:data.diets}
                return res.status(200).json(recipeAPI)}}
            
            const recipeBD=await Recipe.findByPk(id,{include:[{
                model:Diet,
                attributes:['name'],
                through:{
                attributes:[]}}
            ]})
            if(recipeBD){
                let rBD={id:recipeBD.id,title:recipeBD.title,summary:recipeBD.summary,steps:recipeBD.steps,healthScore:recipeBD.healthScore,image:recipeBD.image,diets:recipeBD.diets.map(d=>d.name)}
                return res.status(200).json(rBD)}
        
            //res.status(404).json({message:"No se encontro el receta"})
        
        }
        
        catch(err){  res.send(err)}
    
    
    
})
router.post('/recipes', async(req, res) => {
    const {title,summary,healthScore,steps,image,diets}=req.body
    try{
        const recipe = await Recipe.create({title,summary,healthScore,steps,image})
        await recipe.addDiet(diets)
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
