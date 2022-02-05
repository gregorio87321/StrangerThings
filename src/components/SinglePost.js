import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../api";

const SinglePost = ({ posts, token, setPosts, userData }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  const history = useHistory();
  const onDelete = (event) => {
    event.preventDefault();
    const newPost = posts.filter((post) => postId !== post._id);
    callApi({
      method: "DELETE",
      url: `/posts/${postId}`,
      token
    })
    setPosts(newPost);
    history.push("/posts")

  };
  return (
    <>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Delivers: {post.willDeliver ? "Yes" : "No"}</p>
          {userData.username === post.author.username ? (
            <button onClick={onDelete}>DELETE MESSAGE</button>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SinglePost;
