// import Post from "../post/Post";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user, fetchd} = useContext(AuthContext)
  useEffect(() => {
    if (typeof user === undefined || user === null) {
      window.location.href = "/login"
    }
  }, [])
  useEffect(()=>{
    const fetchPosts =async ()=>{
      const res= username 
      ? await axios.get("posts/profile/" + username) 
       : await axios.get(`posts/timeline/${user?._id}`.replace(" ", ""))
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)- new Date(p1.createdAt);
      }))
    }
    fetchPosts();
  }, [username,user?._id, fetchd])
  return (
    <div className="feed">
    {(!username || username===user.username)  && <Share />}
      {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
    </div>
  );
}