import React, { useState } from "react";
import { Link } from 'react-router-dom'

// const API_REGISTER = 'https://strangers-things.herokuapp.com/api/2108-LSU-RM-WEB-PT/users/register'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`user name: ${username}`);
        console.log(`password: ${password}`);    
    }
    
    return (
     <div>
        <h1 style={{textAlign: 'center'}}>Log In</h1>
        <form onSubmit={handleSubmit}>
         <input
            type='text' 
            placeholder='Username' 
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input
            type='password' 
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
           ></input>
           <button type='submit'>Login</button>
        </form>
        <Link to="/register">Don't have an account? Sign Up</Link>
        {/* <button 
          onClick={(event) => {
          event.preventDefault()
          console.log("sending message")
        }}>
          Don't have an account? Sign Up
        </button> */}
    </div>
    )
};

export default Login;
