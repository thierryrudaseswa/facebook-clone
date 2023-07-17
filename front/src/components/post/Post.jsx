import { Link } from "react-router-dom";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Refresh  } from '@material-ui/icons';
import axios from "axios"
import { useState,useEffect, useContext } from "react";
import {format} from "timeago.js";
import AuthContext from "../../context/AuthContext";

import { Delete as DeleteIcon} from '@material-ui/icons';
import { Edit } from "@material-ui/icons";
export default function Post({post}) {
  const [updateMode,setupdateMode] = useState(false);
  const [like,setLiked] = useState(post.likes.length);
  const [isLiked,setIsLiked] = useState(false);
  const [user,setUser] = useState({});
  const [posts, setPosts] = useState("");
  const {user:currentUser} = useContext(AuthContext)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    if (typeof currentUser === undefined) {
      window.location.href = "/login"
    }
  }, [])
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id));

  },[currentUser._id,post.likes])

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await axios.get(`/user/${post.userId}`);
      setUser(userResponse.data);
      const postsResponse = await axios.get(`/posts/${post.userId}`);
      // console.log(postsResponse)
      setPosts(postsResponse.data);

    };
  
  fetchUserData();
    console.log(user);
  }, [post.userId]);


  const likeHandler = () =>{
    try{
      axios.put("/posts/" + post._id + "/like",{
        UserId:currentUser._id
      })
    }catch(err){}
    setLiked(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  //updating the user
  const handleDelete= async(e)=>{
    e.preventDefault();
    try{
      await axios.delete(`/posts/${post._id}`, {
        data: {
          userId: user._id
        }
      
      });
      window.location.replace("/");

    }catch(error){
    console.log("error");
    }
  }


  // deleting the post

 

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user._id}`}>
            <img
              className="postProfileImg"
              src= {user.profilePicture ? user.profilePicture: PF + "imgs/person/2.jpeg"}
              alt=""
            />
           
            </Link>
            <span className="postUsername">
              
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
            <DeleteIcon className="deleteIcon" onClick={handleDelete}/>
           
             
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="../../assets/imgs/like.png"  onClick={likeHandler} alt="" />
            <img className="likeIcon" src="../../assets/imgs/heart.png"   onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}