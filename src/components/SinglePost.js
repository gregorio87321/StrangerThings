import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../api";
import { EditPostForm } from ".";
import { Message } from ".";

const SinglePost = ({ posts, token, setPosts, userData }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  const history = useHistory();
  const newPosts = posts.filter((post) => postId !== post._id);

  const [editPost, setEditPost] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    willDeliver: false,
    message: "",
  });

  const onDelete = async (event) => {
    event.preventDefault();
    await callApi({
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
      },
    });
    const postData = data.post;
    newPosts.push(postData);
    setPosts(newPosts);

    // history.push("/posts");
  };

  //  Post method for messages goes here

  return (
    <>
      {post ? (
        <div className="card">
          <h3 className="cardTitle">{post.title}</h3>
          <p  style={{ display: "flex", justifyContent: "center"}}>Posted by: {post.author.username}</p>
          <p className="card-header">Price: {post.price}</p>
          <p className="card-header">Location: {post.location}</p>
          <p className="card-header">
            Delivers: {post.willDeliver ? "Yes" : "No"}
          </p>

          {userData.username === post.author.username ? (
            <button className="deleteBtn" onClick={onDelete}>
              Delete
            </button>
          ) : null}
           {/* {userData.username === post.author.username ? (
        <EditPostForm
          editPost={editPost}
          setEditPost={setEditPost}
          onEdit={onEdit}
        />
      ) : (
        <Message token={token} posts={posts} />
      )} */}
        </div>
      ) : (
        ""
      )}
      {/* fix this so the edit and send message are outside of of card div, and refreshes without error */}
               {post && userData.username === post.author.username ? (
        <EditPostForm
          editPost={editPost}
          setEditPost={setEditPost}
          onEdit={onEdit}
        />
      ) : (
        <Message token={token} posts={posts} />
      )}
     
    </>
  );
};

export default SinglePost;
