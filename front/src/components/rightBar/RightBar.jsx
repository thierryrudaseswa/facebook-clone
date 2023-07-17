// import jpeg from "../../assets/imgs/gift.png";
// import ad from "../../assets/imgs/ad.png";
import "./rightBar.css"
import React, { useContext, useEffect, useState } from 'react'
import {Users} from "../../dummyData"
import Online from "../online/Online"
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";



function RightBar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const [friends,setFriends] = useState([]);

const { user, dispatch } = useContext(AuthContext);
const [followed, setFollowed] = useState(
  user.followings.includes(user?.id)
);


const handleClick= async () =>{
  try{
    if(followed){
      await axios.put(`/users/${user._id}/unfollow`,{
        userId:user._id
      });
      dispatch({type : "UNFOLLOW", payload:user._id})
    }else{
      await axios.put(`/users/${user._id}/follow`, {
        userId: user._id,
      });
      dispatch({ type: "FOLLOW", payload: user._id });
    
    }
    setFollowed(!followed);
  }catch(err){}
}


useEffect(()=>{
  const getFriends = async ()=>{
    const friendList = await axios.get("/users/friends/" + user._id)
    setFriends(friendList.data)
  }
  getFriends();
},[user])
  const HomeRightBar =()=>{
    return(
      <>
    
       <div className="birthdayContainer">
          <img src="../../assets/imgs/gift.png" className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>pola Foster</b> and <b>3 otherfriends</b> have birthday</span>
        </div>
        <img src="../../public/assets/imgs/person/4.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
        {Users.map((u)=>(
          <Online key={u.id} user={u} />
        ))}
       
        </ul>
        </>
    )
  };


  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== user.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
           {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}</button>
)}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">{user.from}</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">{user.relationship===1 ? "single" : user.relationship===2 ? "married" : "-"}</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "/img/person/1.jpeg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
       { user ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  )
}

export default RightBar
