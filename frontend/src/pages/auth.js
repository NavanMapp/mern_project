import React, { useState } from 'react';
import axios from 'axios' 
import  { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
    return (
        <div className='auth'>
            <Login />
            <Register />
        </div>
    )
}

const Login = () => {

    const [ username, password ] = useState('')
    const [ setUsername, setPassword ] = useState('')

    const [, setCookies ] = useCookies(['access_token'])

    const navigate = useNavigate()
    
    const onSubmit = async () => {
        event.preventDefault()

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                username,
                password,
            })
            setCookies('access_token', response.data.token)
            window.localStorage.setItem('userID', response.data.userID)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label= 'Login'
            // onSubmit={onSubmit}
        />
    )
}

const Register = () => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:3000/auth/register', {
                username,
                password,
            })
            alert('Registration completed, Now you may login!') 
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Form
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                label= 'Register'
                onSubmit={onSubmit}
            />
            {/* <div className='auth-container'>
                    <div className='form-group'>
                        <label htmlFor='confirm Password' > Confirm Password: </label>
                        <input type='text' id='password' value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
            </div> */}
        </>
        
    )
}

const Form = ({username, password, setUsername, setPassword, label, onSubmit}) => {
    
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2> {label} </h2>
                <div className='form-group'>
                    <label htmlFor='username' > Username: </label>
                    <input type='text' id='username' value={username}
                        onChange={event => setUsername(event.target.value) }
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password' > Password: </label>
                    <input type='password' id='password' value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit'> {label} </button>
            </form>
        </div>
    )
}