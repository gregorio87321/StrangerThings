import React, { useState } from "react";
import { registerUser } from "../api";
import { Link, useHistory } from "react-router-dom"


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`user name: ${username}`);
        console.log(`password: ${password}`);
        const userData = {
          user: {
            username,
            password,
          },
        };
        try {
          const results = await registerUser(userData);
          const token = results.data.token
          history.push(`/posts`)
          console.log('token', token)
          
          console.log(results);
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
     <div>
        <h1 style={{textAlign: 'center'}}>Register</h1>
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
           <button type='submit'>Register</button>
        </form>
        <Link to="/Login">Already have an account? Log In</Link>
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

export default Register;
