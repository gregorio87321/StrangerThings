import React, { useState } from "react";
import { callApi } from "../api";
import { useHistory, useParams } from "react-router-dom";
import Posts from "./Posts"


const NewPostForm = ({ token, setPosts, posts, action, setShowNewPostForm  }) => {
  const history = useHistory();
  const { postId } = useParams();

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    willDeliver: false,
  });
  const isEdit = action === "edit";
  const title = isEdit ? "Edit this post" : "Add a New Post";
  const method = isEdit ? "PATCH" : "POST";
  const API_URL = isEdit ? `/posts/${postId}` : `/posts`;

  const handleSubmit = async (event) => {
    console.log("clicked", newPost);

    event.preventDefault();
    try {
      const {
        data: { post },
      } = await callApi({
        url: API_URL,
        method: method,
        body: {
          post: {
            title: newPost.title,
            description: newPost.description,
            price: newPost.price,
            location: newPost.location,
            willDeliver: newPost.willDeliver,
          },
        },
        token,
      });

      if (isEdit) {
        //* grab existing posts other than the one ive edited
        //* add in the post ive edited
        const filteredPosts = posts.filter((post) => post._id !== postId);
        setPosts([...filteredPosts, post]);
      } else {
        //* Otherwise I am creating a post, so just take my old posts and add this new one to the bottom of the list
        setPosts([...posts, post]);
        console.log(posts);
      }
      //* No matter what send users to the /posts page when we are done
     
      setShowNewPostForm(false);
    } catch (error) {
      console.error("error adding a post: ", error);
    } 
  } ;

  const handlePostFieldChange = (property) => (event) => {
    if (property === "willDeliver") {
      setNewPost({ ...newPost, [property]: event.target.checked });
    } else {
      setNewPost({ ...newPost, [property]: event.target.value });
    }
  };

  return (
    <>
      <h2 style={{ display: "flex", justifyContent: "center", paddingTop:"15px" }}>{title}</h2>
      <div className="newPost">
        <form className="newPost" onSubmit={handleSubmit}>
          <input className="newPostInput"
            type="text"
            placeholder="title:"
            onChange={handlePostFieldChange("title")}
            value={newPost.title}
          ></input>
          <input className="newPostInput"
            type="text"
            placeholder="description:"
            onChange={handlePostFieldChange("description")}
            value={newPost.description}
          ></input>
          <input className="newPostInput"
            type="text"
            placeholder="price:"
            onChange={handlePostFieldChange("price")}
            value={newPost.price}
          ></input>
          <input className="newPostInput"
            type="text"
            placeholder="location:"
            onChange={handlePostFieldChange("location")}
            value={newPost.location}
          ></input>
          <label>
            Deliver ?
            <input
              type="checkbox"
              onChange={handlePostFieldChange("willDeliver")}
              value={newPost.willDeliver}
            ></input>
          </label>
          <button className="editBtn">Add</button>
        </form>
      </div>
    </>
  );
};

export default NewPostForm;
