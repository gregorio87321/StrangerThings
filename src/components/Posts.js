import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../api";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {    
        try {
          const results = await fetchAllPosts();
          console.log(results)
          setPosts(results.data.posts);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        fetchPosts()
      }, []);
    
    return (
     <div>
        <h1 style={{textAlign: 'center'}}>Posts</h1>
        {posts.map(post =>
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
                    event.preventDefault()
                    console.log("sending message")
                    }}>
                        SEND MESSAGE
                </button>
            </div>
            )}
      </div>
    )
};

export default Posts;
