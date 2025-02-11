import "./sidebar.css";
import { Home, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar({ user }) {
  return (
    <div className="sidebar">
      {/* Static Cover Image */}
      <div className="sidebar-cover">
        <img src={user.coverPicture || "/defaultCover.png"} alt="Cover" className="cover-image" />
      </div>

      {/* User Profile Section */}
      {user ? (
        <div className="sidebar-profile">
          <img
            src={user.profilePicture || "/defaultProfile.png"} // Directly using the profile picture
            alt={user.username}
            className="profile-avatar"
          />
          <h3 className="profile-name">{user.username}</h3>
          <p className="profile-job">{user.job || "Unknown Profession"}</p>
        </div>
      ) : (
        <div className="sidebar-profile">
          <h3 className="profile-name">User Not Found</h3>
          <p className="profile-job">Unknown</p>
        </div>
      )}

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        <ul className="menu-list">
          <li className="menu-item">
            <Home className="menu-icon" />
            <span className="menu-text">
              <Link to="/home">Home</Link>
            </span>
          </li>
          <li className="menu-item">
            <Person className="menu-icon" />
            <span className="menu-text">
              <Link to={`/profile/${user?.username || "unknown"}`}>Profile</Link>
            </span>
          </li>
          <li className="menu-item">
            <Chat className="menu-icon" />
            <span className="menu-text">Messages</span>
          </li>
          <li className="menu-item">
            <Notifications className="menu-icon" />
            <span className="menu-text">Notifications</span>
          </li>
        </ul>
      </div>
    </div>
  );
}




// import "./sidebar.css";
// import { Home, Person, Chat, Notifications } from "@mui/icons-material";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Sidebar() {
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const [user, setUser] = useState(null); // State to store user data

//   useEffect(() => {
//     // Fetch user data from the API based on user ID
//     const fetchUser = async () => {
//       try {
//         const userId = 10; // Example static user ID (can be dynamic)
//         // const res = await axios.get(`/users/${userId}`); 
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div className="sidebar">
//       {/* Static Cover Image */}
//       <div className="sidebar-cover">
//         <img src={`${PF}ad.png`} alt="Cover" className="cover-image" />
//       </div>

//       {/* User Profile Section */}
//       {user ? (
//         <div className="sidebar-profile">
//           <img
//             src={user.profilePicture ? PF + user.profilePicture : `${PF}person/noAvatar.png`}
//             alt={user.username}
//             className="profile-avatar"
//           />
//           <h3 className="profile-name">{user.username}</h3>
//           <p className="profile-job">{user.job || "Unknown Profession"}</p>
//         </div>
//       ) : (
//         <div className="sidebar-profile">
//           <h3 className="profile-name">User Not Found</h3>
//           <p className="profile-job">Unknown</p>
//         </div>
//       )}

//       {/* Sidebar Menu */}
//       <div className="sidebar-menu">
//         <ul className="menu-list">
//           <li className="menu-item">
//             <Home className="menu-icon" />
//             <span className="menu-text">
//               <Link to="/Home">Home</Link>
//             </span>
//           </li>
//           <li className="menu-item">
//             <Person className="menu-icon" />
//             <span className="menu-text">
//               <Link to={`/profile/${user?.username || "unknown"}`}>Profile</Link>
//             </span>
//           </li>
//           <li className="menu-item">
//             <Chat className="menu-icon" />
//             <span className="menu-text">Messages</span>
//           </li>
//           <li className="menu-item">
//             <Notifications className="menu-icon" />
//             <span className="menu-text">Notifications</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
