import React, { useState } from "react";
import { callApi } from "../api";
import { useHistory, useParams } from "react-router-dom";


const EditPostForm = ({editPost, setEditPost, onEdit}) => {


  return (
    <>
      <h2 className="newPostHead">edit post</h2>
      <div className="newPost">
        <form className="newPost" onSubmit={onEdit}>
          <input
            type="text"
            placeholder="title"
            onChange={(event) => {
                setEditPost({...editPost, title:event.target.value})
            }}
            value={editPost.title}
          ></input>
          <input
            type="text"
            placeholder="description"
            onChange={(event) => {
                setEditPost({...editPost, description:event.target.value})
            }}
            value={editPost.description}
          ></input>
          <input
            type="number"
            placeholder="price"
            onChange={(event) => {
                setEditPost({...editPost, price:event.target.value})
            }}
            value={editPost.price}
          ></input>
          <input
            type="text"
            placeholder="location"
            onChange={(event) => {
                setEditPost({...editPost, location:event.target.value})
            }}
            value={editPost.location}
          ></input>
          <label>
            Deliver ?
            <input
              type="checkbox"
              onChange={(event) => {
                setEditPost({...editPost, willDeliver:event.target.checked})
            }}
              value={editPost.willDeliver}
            ></input>
          </label>
          <button type="submit">edit post</button>
        </form>
      </div>
    </>
  );
};

export default EditPostForm;
