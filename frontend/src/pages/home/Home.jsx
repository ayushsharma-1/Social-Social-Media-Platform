import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [userData, setUserData] = useState(user || {}); // Initialize with context data

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && user._id) { // Ensure we have a user ID
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`);
          console.log(res);
          setUserData(res.data); // Update state with fetched user data
        }
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err.message);
      }
    };

    if (!userData.username) { // Fetch only if we don’t already have username
      fetchUserDetails();
    }
  }, [user, userData.username]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar user={user} />
        <Feed user={user} />
        <Rightbar user={user} />
      </div>
    </>
  );
}





// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
// import "./home.css"


// export default function Home() {
//   // const HomeData=()=>{
//   //   console.log("Hello how are you");
//   // }
//   return (
//     <>
//       {/* <button onClick={HomeData}>Hello How Are you</button> */}
//       <Topbar />
//       <div className="homeContainer">
//         <Sidebar />
//         <Feed/>
//         <Rightbar/>
//       </div>
//     </>
//   );
// }
