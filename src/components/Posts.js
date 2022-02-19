import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NewPostForm from "./NewPostForm";

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    alignItems: "center",
  },
  searchInput: {
    margin: "0 16px",
  },
};

const postMatches = (post, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const {
    description,
    location,
    title,
    author: { username },
  } = post;

  const toMatch = [description, location, title, username];

  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Posts = (props) => {
  const { token, posts, userData, fetchPosts, setPosts } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  // const [newPosts, setNewPosts] = useState([...posts]);
  useEffect(async () => {
    const posts = await fetchPosts();

    setPosts(posts);
  }, []);

  // const addNewPosts = (newPosts) => {
  //   setNewPosts(newPosts);
  //   setShowNewPostForm(false);
  // };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const history = useHistory();

  return (
    <div>
      <div>
        <h1 className="postTitle">Posts</h1>
      </div>
      <div style={styles.searchContainer}>
        
        <input className="searchBar"
          // style={styles.searchInput}
          type="text"
          placeholder="search for post:"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        
      </div>
      {/* <br></br> */}
        <hr></hr>

      {userData.username && !showNewPostForm ? (
        <button
          onClick={(event) => {
            event.preventDefault();
            setShowNewPostForm(true);
          }}
        >
          New Post
        </button>
      ) : 
      <button
      onClick={(event) => {
        event.preventDefault();
        setShowNewPostForm(false);
      }}
    >
      All Posts
    </button>}
      {showNewPostForm ? (
        <NewPostForm
          token={token}
          setPosts={setPosts}
          posts={posts}
          action="create"
          setShowNewPostForm={setShowNewPostForm}
        />
      ) : (
        filteredPosts.map((post) => (
          <div className="card" key={post._id}>
             <h2 className="cardTitle">{post.title}</h2>
               
            <span className="card-text">{post.description}</span>
            {/* <br></br> */}
            <span className="card-header">Price: {post.price}</span>
            {/* <br></br> */}
            <span className="card-header">Seller: {post.author.username}</span>
            {/* <br></br> */}
            <span className="card-header">Location: {post.location}</span>
            {/* <br></br> */}
            <button
              className="btn-info"
              onClick={() => history.push(`/posts/${post._id}`)}
            >
              {" "}
              view
            </button>
          
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
