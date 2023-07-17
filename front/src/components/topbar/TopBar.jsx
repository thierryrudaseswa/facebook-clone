import "./topBar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button } from "@material-ui/core";

export default function TopBar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user,dispatch} = useContext(AuthContext);
  useEffect(() => {
    if (typeof user === undefined) {
      window.location.href = "/login"
    }
  }, []);
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}> <span className="logo">BUSINESS CHAT</span></Link> 
       
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/Messenger"><Chat /></Link>  
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
         {user && <Button onClick={handleLogout}>LOGOUT</Button>} 
          </div>
        </div>
        {/* <Link to={`/profile/${user._id}`.replace(" ", "")}> */}
        
      {user && (<Link to={`/profile/${user?._id}`}>
        <img src= { user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "imgs/person/6.jpeg"} alt="" className="topbarImg" />
        </Link>)}  
        
      </div>
    </div>
  );
}