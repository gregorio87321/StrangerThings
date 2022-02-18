import React, { useState } from "react";
import { callApi } from "../api";
import { Link, useHistory } from "react-router-dom"


const Register = (props) => {
    const { setToken } = props;
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
                url: '/users/register',
                method: 'POST',
                body: userData
              });
          const { token } = data
          localStorage.setItem('token', JSON.stringify(token));
          setToken(token)
          history.push(`/posts`)
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
     <div>
        <h1 style={{textAlign: 'center'}}>Register</h1>
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
           <button className="loginBtn" type='submit'>Register</button>
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
