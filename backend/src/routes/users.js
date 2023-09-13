import express from 'express'
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({username})

    if (user) {
        return res.json({message: 'User already exists!'})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({username, password:hashPassword})
    await newUser.save()

    res.json({message: 'User Registered Successfully!'})
})

router.post('/login', async (req, res) => {
    const { username , password } = req.body
    const user = await UserModel.findOne({ username })

    if (!user) {
        return res.json({message: 'User Does not exist!'})
    }

    const validPassword = await UserModel.findOne(password, user.password)
    if (!validPassword) {
        return res.json({message:'Username or Password Is Incorrect'})
    }

    const token = jwt.sign({id: user._id}, 'secret')
    res.json({token, userID: user._id})
})

export { router as userRouter }