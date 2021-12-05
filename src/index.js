import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Login, Posts, Register } from "./components";
import { useState, useEffect } from "react";
import { callApi } from "./api";

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  const fetchUserData = async (token) => {
    const { data } = await callApi({
      url: "/users/me",
      token,
    });
    return data;
  };

  const fetchPosts = async () => {
    const {
      data: { posts },
    } = await callApi({
      url: "/posts",
    });
    return posts;
  };

  useEffect(async () => {
    console.log(token, "local token")
    console.log(localStorage.getItem("token"), "storage token")
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  useEffect(async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  }, []);

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.setItem("token", null);
    history.push(`/posts`);
  };

  return (
    <div>
      <div>
        <h1> Stranger's Things </h1>
        {!userData.username ? (
          <Link to="/login">Log In</Link>
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              logout();
            }}
          >
            Log Out
          </button>
        )}
        <Link style={{ marginLeft: "10px" }} to="/posts">
          Posts
        </Link>
      </div>

      <Route path="/login">
        <Login action="login" setToken={setToken} />
      </Route>
      <Route path="/register">
        <Register action="register" setToken={setToken} />
      </Route>
      <Route path="/posts">
        <Posts token={token} posts={posts} userData={userData} />
      </Route>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
