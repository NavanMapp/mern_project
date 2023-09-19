import express from "express"
import { ReceipeModel } from "../models/Recipes.js"
import mongoose from "mongoose"
import { UserModel } from "../models/Users.js"

const router = express.Router()

router.get('/', async(req, res ) => {
    try {
        const response = await ReceipeModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.post('/', async(req, res ) => {
     
    const recipe = new ReceipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.put('/', async(req, res ) => {

    try {
        const recipe = await ReceipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipe.push(recipe)
        await recipe.save()
        res.json( {savedRecipe: user.savedRecipe} )
    } catch (error) {
        res.json(error)
    }
})

router.get('/savedRecipe/ids', async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        res.json( { savedRecipe: user?.savedRecipe })        
    } catch (error) {
        res.json(error)
    }
})

router.get('/savedRecipe', async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        const savedRecipe = await ReceipeModel.findById( {
            _id: { $in: user.savedRecipe },
        })
        res.json( { savedRecipe: user?.savedRecipe })        
    } catch (error) {
        res.json(error)
    }
})

export {router as recipeRouter }