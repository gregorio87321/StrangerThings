import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../api";
import { EditPostForm } from ".";

const SinglePost = ({ posts, token, setPosts, userData }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  const history = useHistory();
  const newPosts = posts.filter((post) => postId !== post._id);

  const [editPost, setEditPost] = useState({
    title: '',
    description: '',
    price: 0,
    location: '',
    willDeliver: false,
  });

  const onDelete = (event) => {
    event.preventDefault();
    callApi({
      method: "DELETE",
      url: `/posts/${postId}`,
      token,
    });
    setPosts(newPosts);
    history.push("/posts");
  };

  const onEdit = async (event) => {
    event.preventDefault();
    const { data } = await callApi({
      method: "PATCH",
      url: `/posts/${postId}`,
      token,
      body: {
       post: editPost,
      }
    });
    const postData = data.post
    newPosts.push(postData);
    setPosts(newPosts)
    
    // history.push("/posts");
  };

  //  Post method for messages goes here

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
            <button onClick={onDelete}>DELETE POST</button>
          ) : null}
          {userData.username === post.author.username ? (
            <EditPostForm
              editPost={editPost}
              setEditPost={setEditPost}
              onEdit={onEdit}
            />
          ) : null}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SinglePost;
