import { useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {isFetching,dispatch}= useContext(AuthContext);
  const handleClick= (e)=>{
    e.preventDefault();
    loginCall(
      {email:email,password:password},
      dispatch
    )
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Business Chat</h3>
          <span className="loginDesc">
            Connect with partners and the world around you on Business Chat.
          </span>
        </div>
        <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <div className="loginBox">
            <input
             placeholder="Email" 
             className="loginInput" 
             type="email" 
             required
             onChange={(e)=>setEmail(e.target.value)}
             />
            <input
             placeholder="Password" 
             className="loginInput" 
             type="password"
             required
             minLength="8"
            onChange={(e)=>setPassword(e.target.value)}
             />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (<CircularProgress color="white" size="24px"/> ) : ("Log In")}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">            <button className="loginRegisterButton">
            {isFetching ? (<CircularProgress color="white" size="24px"/> ): ("Create new Account")}
            </button></Link>

            
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}