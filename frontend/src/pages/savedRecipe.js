import { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hook/useGetUserID"


export const SavedRecipes = () => {
    const [ savedRecipes, setSavedRecipes] = useState([])
    const userID = useGetUserID()

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
            } catch (error) {
                console.error(error)
            }
        }

        fetchSavedRecipe()
    }, [])

    // const deleteRecipe = () => {
        
    // }

    return (
        <div>
            <h1> Saved Recipes </h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id} >
                        <div>
                            <h2>{recipe.name}</h2>
                            {/* <button
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                                >
                                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save' } 
                            </button> */}
                        </div>
                        <div className='instructions' >
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
