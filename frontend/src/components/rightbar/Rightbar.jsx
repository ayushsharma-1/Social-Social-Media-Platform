import { useState, useEffect, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./rightbar.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const SuggestedFriends = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [addedFriends, setAddedFriends] = useState([]);

  // Fetch suggested friends
  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + user._id); // Replace with your API endpoint for suggested friends
        setSuggestedFriends(res.data);
      } catch (err) {
        console.error("Error fetching suggested friends:", err);
      }
    };
    fetchSuggestedFriends();
  }, []);

  // Handle add/remove friend
  const handleFriendAction = async (friendId) => {
    try {
      if (addedFriends.includes(friendId)) {
        await axios.put(`/users/${friendId}/unfollow`, { userId: currentUser._id });
        setAddedFriends((prev) => prev.filter((id) => id !== friendId));
      } else {
        await axios.put(`/users/${friendId}/follow`, { userId: currentUser._id });
        setAddedFriends((prev) => [...prev, friendId]);
      }
    } catch (err) {
      console.error("Error updating friend status:", err);
    }
  };

  return (
    <div className="rightbarContainer">
      <div className="suggested-friends-container">
        <h2 className="suggested-title">Suggested Friends</h2>
        <div className="friends-list">
          {suggestedFriends.map((user) => (
            <div className="friend-item" key={user._id}>
              <img
                src={user.profilePicture || "assets/person/noAvatar.png"}
                alt={user.username}
                className="friend-avatar"
              />
              <div className="friend-info">
                <span className="friend-name">{user.username}</span>
                <span className="friend-job">{user.job || "No Job Title"}</span>
              </div>
              <button
                className="add-friend-button"
                onClick={() => handleFriendAction(user._id)}
              >
                {addedFriends.includes(user._id) ? <RemoveIcon /> : <AddIcon />}
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="copyright">
          © 2024 Ayush Sharma Social. All rights reserved.
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">
            About
          </a>
          <a href="#" className="footer-link">
            Help
          </a>
          <a href="#" className="footer-link">
            Privacy & Terms
          </a>
        </div>
      </footer>
    </div>
  );
};

export default SuggestedFriends;
