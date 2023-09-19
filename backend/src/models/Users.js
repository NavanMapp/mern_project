import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    savedRecipe: [{ type: mongoose.Types.ObjectId, ref: 'Recipes' }]
})

const UserModel = mongoose.model('Users', UserSchema)

export { UserModel }