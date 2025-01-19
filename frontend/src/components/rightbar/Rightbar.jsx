import React from "react";
import { Users } from "../../dummyData";
import AddIcon from "@mui/icons-material/Add";
import "./rightbar.css"

const SuggestedFriends = () => {
  return (
    <div className="rightbarContainer">
    <div className="suggested-friends-container">
      <h2 className="suggested-title">Suggested Friends</h2>
      <div className="friends-list">
        {Users.map((user) => (
          <div className="friend-item" key={user.id}>
            <img
              src={user.profilePicture}
              alt={user.username}
              className="friend-avatar"
            />
            <div className="friend-info">
              <span className="friend-name">{user.username}</span>
              <span className="friend-job">Software Engineer</span>
            </div>
            <button className="add-friend-button">
              <AddIcon />
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
        <a href="#" className="footer-link">About</a>
        <a href="#" className="footer-link">Help</a>
        <a href="#" className="footer-link">Privacy & Terms</a>
      </div>
    </footer>
    </div>
    
  );
};

export default SuggestedFriends;
