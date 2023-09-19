import express from 'express'
import 'dotenv/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './src/routes/users.js'
import { recipeRouter } from './src/routes/recipes.js'

const PORT = process.env.PORT
const MongoDB_URL = process.env.MongoDB
const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)
app.use('/recipes', recipeRouter)

mongoose.connect(MongoDB_URL, console.log('Connected to MongoDB successfully'))

app.listen(PORT, () => console.log(`listening from Port ${PORT}`))

