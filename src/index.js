import { directive } from '@babel/types';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login, Posts, Register } from "./components"

const App = () => {
  const [ token, setToken] = useState('');
  const [ userData, setUserData ] = useState({});
  const [ posts, setPosts ] = useState([])
  
  return (
    <div>
    <h1> Stranger's Things </h1>
    
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
    
    </div>
  );
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));