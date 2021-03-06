import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { callApi } from "../api";

const Login = (props) => {
    const { setToken } = props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userData = {
        user: {
          username,
          password,
        },
      };
      try {
          const { data } = await callApi({
              url: '/users/login',
              method: 'POST',
              body: userData
            });
        const { token } = data
        localStorage.setItem('token', JSON.stringify(token));
        setToken(token)
        history.push(`/posts`)
        console.log('token', token)
      
      } catch (error) {
        console.error(error);
      }
    }

    // console.log("action", action)
    
    return (
     <div>
        <h1 style={{textAlign: 'center'}}>Log In</h1>
        <form className="username" onSubmit={handleSubmit}>
         <input 
            type='text' 
            placeholder='username:' 
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input className="password"
            type='password' 
            placeholder='password:'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
           ></input>
           <button className="loginBtn" type='submit'>Login</button>
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
