import React, { useState, Link } from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../api";

const Profile = ({ userData }) => {
  const [message, setMessage] = useState("");
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
          {" "}
          My Profile{" "}
        </h1>
        <hr></hr>
        {/* <h2 style={{ display: "flex", justifyContent: "center" }}>
          {"Welcome back "}
          {userData.username}!{" "}
        </h2> */}
        {userData.posts &&
          activePost.map((post) => (
            <div key={post._id}>
              <h2>My Posts</h2>
              <h3 className="posts">{post.title}</h3>
              <span>{post.description}</span>
              <br></br>
              <span>Price: {post.price}</span>
              <br></br>
              <span>Seller: {post.author.username}</span>
              <br></br>
              <span>Location: {post.location}</span>
              <br></br>
            </div>
          ))}
       
       
      </>
    </div>
  );
};

export default Profile;
