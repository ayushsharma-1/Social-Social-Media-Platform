import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import ProfileTop from "../../components/profile/profile"

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <ProfileTop/>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div> 
      </div>
    </>
  );
}
