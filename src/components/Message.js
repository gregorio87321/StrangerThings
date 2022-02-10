import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../api";
// import { Profile } from ".";

const Message = ({ token, posts }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  const [newMessage, setNewMessage] = useState("");

  const onMessage = (event) => {
    event.preventDefault();
    callApi({
      method: "POST",
      url: `/posts/${postId}/messages`,
      token,
      body: {
        message: {
          content: newMessage,
        },
      },
    });
    setNewMessage("");
  };

  return (
    <>
      <label>Send a Message to this User</label>
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      ></input>
      <button type="button" onClick={onMessage}>
        Send Message
      </button>
    </>
  );
};

export default Message;
