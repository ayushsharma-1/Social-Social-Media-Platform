import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/timeline/${user._id}`);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* Display Share component only if username matches the logged-in user */}
        <Share />
        {/* Render posts */}
        {posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <p className="no-posts">No posts to show.</p>
        )}
      </div>
    </div>
  );
}



// import { useContext, useEffect, useState } from "react";
// import Post from "../post/Post";
// import Share from "../share/Share";
// import "./feed.css";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// export default function Feed({ username }) {
//   const [posts, setPosts] = useState([]); // State to store posts
//   const { user } = useContext(AuthContext); // Get user context

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // const res = username
//         //   ? await axios.get(`/posts/profile/${username}`) // Fetch profile posts if username is provided
//         //   : await axios.get(`/posts/timeline/${user._id}`); // Fetch timeline posts
          
//         // Sort posts by creation date (most recent first)
//         setPosts(
//           res.data.sort((p1, p2) => {
//             return new Date(p2.createdAt) - new Date(p1.createdAt);
//           })
//         );
//       } catch (err) {
//         console.error("Failed to fetch posts:", err);
//       }
//     };

//     fetchPosts();
//   }, [username, user._id]); // Dependency on username and user ID

//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         {/* Display Share component only if username matches the logged-in user or no username is provided */}
//         {(!username || username === user.username) && <Share />}
//         {/* Render posts */}
//         {posts.length > 0 ? (
//           posts.map((p) => <Post key={p._id} post={p} />)
//         ) : (
//           <p className="no-posts">No posts to show.</p> // Fallback for no posts
//         )}
//       </div>
//     </div>
//   );
// }
