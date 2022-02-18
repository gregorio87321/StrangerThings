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
    <div>
      <label className="messageTitle">Send a Message to this User</label>
      </div>
      <div>
      <input className="messageInput"
        type="text"
        placeholder="Message:"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      ></input>
      <button className="messageBtn" type="button" onClick={onMessage}>
        Send 
      </button>
      </div>
    </>
  );
};

export default Message;
