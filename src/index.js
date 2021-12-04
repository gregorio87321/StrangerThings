import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login, Posts, Register } from "./components"
import { useState } from "react"

const App = () => {
  const [ token, setToken] = useState('');
  // const [ userData, setUserData ] = useState({});
  // const [ posts, setPosts ] = useState([])
  
  
  return (
    <div>
    <h1> Stranger's Things </h1>
    
      <Route path="/login">
        <Login action="login" setToken={setToken}/>
      </Route>
      <Route path="/register">
        <Register action="register" setToken={setToken} />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
    
    </div>
  );
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));