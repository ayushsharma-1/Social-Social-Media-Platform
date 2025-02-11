// Profile.js
import "./profile.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import ProfileTop from "../../components/profile/profile";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(currentUser);
        console.log("User ID: ", currentUser._id);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${currentUser._id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserProfile();
  }, [currentUser._id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <ProfileTop user={user} />
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
      <div>
        Hello how are you
      </div>
    </>
  );
}
