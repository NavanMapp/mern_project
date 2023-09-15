import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {

    const [ cookies, setCookies] = useCookies(['access_token'])
    const navigate = useNavigate()
    const logout = () => {
        setCookies ('access_token')
        window.localStorage.removeItem('userID')
        navigate('/auth')
    }
    return (
        <div className='navbar'>
            <Link to='/' element> Home</Link>
            <Link to='/createRecipe' element> Create Recipe</Link>
            <Link to='/savedRecipe'> Saved Recipe</Link>
            <Link to='/Auth'> Login/Register</Link>
        </div>
    )
}