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
      <div style={styles.searchContainer}>
        <h2 className="allPosts">Posts</h2>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="search for posts"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>

      {userData.username && !showNewPostForm ? (
        <button
          onClick={(event) => {
            event.preventDefault();
            setShowNewPostForm(true);
          }}
        >
          New Post
        </button>
      ) : null}
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
          <div key={post._id}>
            <h3 className="posts">{post.title}</h3>

            <span>{post.description}</span>
            <br></br>
            <span>Price: {post.price}</span>
            <br></br>
            <span>Seller: {post.author.username}</span>
            <br></br>
            <span>Location: {post.location}</span>
            <br></br>
            <button
              className="btn-info"
              onClick={() => history.push(`/posts/${post._id}`)}
            >
              {" "}
              view post
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
