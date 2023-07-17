import "./register.css";
import  axios from "axios";
import { useState } from "react";
// import {useHistory} from "react-route/r-dom";
// import { useHistory } from "react-router";

export default function Register() {

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordAgain,setPasswordAgain] = useState("");
  const [error, setError] = useState(false)
  // const history =useHistory();


  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain !== password) {
      setError(true)
      // passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      try {
        await axios.post("/auth/register", user);
       window.location.href ="/login"
      } catch (err) {
        console.log(err);
      }
    }
  
 
  }

  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Business social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on business social.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
             placeholder="Username" 
             className="loginInput" 
             required
             onChange={(e)=>setUsername(e.target.value)}/>

            <input
             placeholder="Email"
              className="loginInput"
              type="email"
              required
              onChange={(e)=>setEmail(e.target.value)} />


            <input 
            placeholder="Password"
            type="password"
            required
            minLength="8"
             className="loginInput"
             onChange={(e)=>setPassword(e.target.value)} />

            <input
             placeholder="Password Again"
              className="loginInput" 
              type="password"
              required
              onChange={(e)=>setPasswordAgain(e.target.value)}/>
              {error && <span>passwords no mathc</span>}
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}