// import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import "./home.css"

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <SideBar />
        <Feed/>
        <RightBar/>
      </div>
    </>
  );
}