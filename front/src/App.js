import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Messenger from "./pages/messenger/Messenger";
import Topbar from "./components/topbar/TopBar";
import Profile from "./pages/profile/Profile";
import AuthContext from "./context/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

axios.defaults.baseURL = "http://localhost:5500/api";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />

        <Route path="/login" element={user ? <Home /> : <Login />} />

        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/Messenger" element={!user ? <Login /> : <Messenger />} />

        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
