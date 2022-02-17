import React, { useState, Link, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../api";
import { Message, Posts } from ".";

const Profile = ({ userData, setUserData, fetchUserData, token, posts }) => {
  // do I need this?
  // const { postId } = useParams();
  // const post = posts.find((post) => postId === post._id);
  const history = useHistory();

  useEffect(async () => {
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, []);
  console.log(userData);
  if (!userData.posts) {
    return (
      <div>
        <h4>loading</h4>
      </div>
    );
  }
  const activePost = userData.posts.filter((post) => post.active);

  return (
    <div>
      {/* <Link to="">My Messages</Link> */}
      <>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          My Profile
        </h1>

        <hr></hr>
        {/* <h2 style={{ display: "flex", justifyContent: "center" }}>
          {"Welcome back "}
          {userData.username}!{" "}
        </h2> */}
        <h2>My Posts</h2>
        {userData.posts &&
          activePost.map((post) => (
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
              <br></br>
              <button
                className="btn-info"
                onClick={() => history.push(`/posts/${post._id}`)}
              >
                {" "}
                view post
              </button>
              {post.messages.length
                ? post.messages.map((message) => (
                    <p key={message._id}>
                      Message from {message.fromUser.username}:{" "}
                      {message.content}
                    </p>
                  ))
                : null}
              <hr></hr>
            </div>
          ))}
        <div>
          <br></br>
          <h2>My Messages</h2>
          {userData.messages
            ? userData.messages.map((message) => (
                <div key={message._id}>
                  <h3 className="messages"></h3>
                  <p>Title: {message.post.title}</p>
                  <p>From User: {message.fromUser.username}</p>
                  <p>Content: {message.content}</p>
                  <button
                    className="btn-info"
                    onClick={() => history.push(`/posts/${message.post._id}`)}
                  >
                    {" "}
                    view post
                  </button>

                  <br></br>
                </div>
              ))
            : null}
        </div>
      </>
    </div>
  );
};

export default Profile;
