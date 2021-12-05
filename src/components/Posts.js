import React, { useState, useEffect } from "react";
import NewPostForm from "./NewPostForm";

const Posts = (props) => {
  const { token, posts, userData } = props;

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPosts, setNewPosts] = useState([...posts]);

  const addNewPosts = (newPosts) => {
    setNewPosts(newPosts)
    setShowNewPostForm(false)
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Posts</h1>
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
        <NewPostForm token={token} setPosts={(posts) => addNewPosts(posts)} posts={posts} action="create" />
      ) : (
        newPosts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <span>{post.description}</span>
            <br></br>
            <span>Price: {post.price}</span>
            <br></br>
            <span>Seller: {post.author.username}</span>
            <br></br>
            <span>Location: {post.location}</span>
            <br></br>
            <button
              onClick={(event) => {
                event.preventDefault();
                console.log("sending message");
              }}
            >
              SEND MESSAGE
            </button>
            {/* {userData.username === post.author.username ?
                <button
                onClick={(event) => {
                  event.preventDefault();
                  console.log("sending message");
                }}
              >
                EDIT MESSAGE
              </button>   
              : null
        } */}
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
