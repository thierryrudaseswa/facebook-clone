import "./profile.css";

import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Edit } from '@material-ui/icons';
import AuthContext from "../../context/AuthContext";


export default function Profile() {

  const {user:currentUser} = useContext(AuthContext);
  const {username} = useParams();
 const [user,setUser] = useState("");
  const [usernameupdate,setUsername ]= useState("");
  const [updateMode,setupdateMode] = useState(false);


  useEffect(()=>{
    const fetchUsers = async ()=>{
      try {
        const res = await axios.get(`/user/${username}`);
        setUser(res.data);
        setUsername(res.data.username);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  },[username]);
  
  useEffect(() => {
    if (typeof username === undefined || username === null) {
      window.location.href = "/login"
    }
  }, [])


const handleEdit = async (e)=>{
  e.preventDefault();
  try{
   await axios.put(`/user/${currentUser._id}`,{
      username:usernameupdate,
      userId: currentUser._id
    
    });
    setupdateMode(false);
    window.location.reload("/")
  }catch(error){
    console.log("error")
  }
}

  return (
    <>
     
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="../../assets/imgs/post/9.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="../../assets/imgs/person/6.jpeg"
                alt=""
              />
               <Edit className="Edit" onClick={()=>setupdateMode(true)}/>

            </div>

            {updateMode ? (
              <input type="text" 
              className="updateInput"
              required
              value={usernameupdate}
              autoFocus
              onChange={(e)=>setUsername(e.target.value)}/>

            ) : (
              <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              {/* <span className="profileInfoDesc">{user.desc}</span> */}
          </div>


            )}
           {updateMode && (
            <button onClick={handleEdit} className="buttonUpdate" >update</button>
           )}
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <RightBar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}