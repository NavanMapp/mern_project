import { useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hook/useGetUserID"
import { useNavigate } from "react-router-dom"
import  { useCookies } from 'react-cookie'

export const CreateRecipe = () => {
    const navigate = useNavigate()
    const userID = useGetUserID()

    const [ cookies, ] = useCookies(['access_token'])

    const [ recipe, setRecipe ] = useState( {
        name: '',
        ingredients: '',
        instructions: '',
        imageUrl: '',
        cookingTime: 0,
        userOwner: userID,
    })
    
   

    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe, [name]: value})
    }

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target
        const ingredients = recipe.ingredients
        ingredients[idx] = value    
        setRecipe({...recipe, ingredients })
    }

    const addIngredient = (event) => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ''] })
    }

    console.log(recipe)

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:3001/recipes', recipe,
            { headers: {authorization: cookies.access_token} })
            alert('Recipe Created! ')
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="create-recipe">
                <h2> Create Recipe </h2>
                <form>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' onChange={handleChange} />
                    <label htmlFor='ingredients'>Ingredients</label>

                    {recipe.ingredients.map((ingredient, idx) => (
                        <input 
                            key={idx}
                            type='text' 
                            name='ingredients' 
                            value={ingredient}
                            onChange={event => handleIngredientChange(event, idx )} />
                    ))}
                    <button onClick={addIngredient} type='button' > Add Ingredient </button>

                    <label htmlFor='instructions'>Instructions</label>
                    <textarea id='instructions' name='instructions'
                        onChange={handleChange} ></textarea>
                    <label htmlFor='imageUrl'>Image URL</label>
                    <input type='imageUrl' id='imageUrl' onChange={handleChange} />
                    <label htmlFor='cookingTime'>Cooking Time</label>
                    <input type='cookingTime' id='cookingTime' onChange={handleChange} />
                    <button type='submit' onChange={onSubmit} >Create Receipe</button>
                </form>
            </div>
        </>
        
    )
}