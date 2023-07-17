import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons";
import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext)
  const [desc,setDesc] =useState('');
  const [file,setFile]=useState(null);


  const handleSubmit= async(e)=>{
    e.preventDefault();
    const newPost = {
      userId: user._id.replace(" ", ""),
      desc: desc,
    };
    if(file){
      const data=new FormData();
      const fileName =Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.img = fileName;
      console.log(newPost);
      try{
        await axios.post("/upload",data)
      }catch(err){

      }
    }
    try{
      await axios.post("/posts",newPost);
      window.location.reload();
    }catch(err) {

    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "ad.png"} alt=""/>
          <input
            placeholder={"whats on your mind "+user.username+"?"}
            className="shareInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input type="file" 
                    style={{display:"none"}}
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}