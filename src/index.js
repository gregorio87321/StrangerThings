import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Login, Posts, Register, SinglePost } from "./components";
import { useState, useEffect } from "react";
import { callApi } from "./api";
import { useHistory } from "react-router-dom";

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

  const logout = async () => {
    // setToken(null);
    // setUserData(null);
    localStorage.removeItem("token");
    history.push(`/posts`);
    window.location.reload(false);
  };

  return (
    <div>
      <div>
        <h1 className="title"> Stranger's Things </h1>
        <>
          {!token ? (
            <Link to="/login">Log In</Link>
          ) : (
            <button
              className="btn-primary"
              onClick={(event) => {
                // event.preventDefault();
                logout();
              }}
            >
              Log Out
            </button>
          )}
        </>
        {token ? (
          <>
            <h2 className="user_greeting"> Hello {userData.username}! </h2>
          </>
        ) : (
          ""
        )}
        <Link style={{ marginLeft: "10px" }} to="/posts">
          Posts
        </Link>
      </div>
      <Switch>
        <Route path="/login">
          <Login action="login" setToken={setToken} />
        </Route>
        <Route path="/register">
          <Register action="register" setToken={setToken} />
        </Route>
        <Route exact path="/posts">
          <Posts token={token} posts={posts} userData={userData} />
        </Route>
        <Route path="/posts/:postId">
          <SinglePost
            posts={posts}
            token={token}
            userData={userData}
            setPosts={setPosts}
          />
        </Route>
      </Switch>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
