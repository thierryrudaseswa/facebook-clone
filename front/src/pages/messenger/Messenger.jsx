import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./messenger.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { io } from "socket.io-client";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMesage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, settMessages] = useState([]);
  const [sockets, setSockets] = useState(null);
  const [onlineusers, setOnlineusers] = useState([]);
  // const socket = useRef(io("ws://localhost:8900"));
  const socket = io("ws://localhost:5000");
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected successfully");
    });
    const clear = setInterval(() => {
      console.log("ping....");
      
      socket.emit("ping", user._id);
    }, 1000);
    socket.on("message", (data) => {
      if (data.conversationId == currentChat?._id) {
        settMessages((past) => [...past, data]);
      }
    });
    socket.on("onlineusers", (user) => {
      setOnlineusers(user);
      console.log("online users: ", onlineusers);
    });
    // socket.open()
    // socket.on("getMessage",(data)=>{
    //   setArrivalMessage({
    //     sender:data.senderId,
    //     text:data.text,
    //     createdAt:Date.now()
    //   })
    // })
    // socket.on("getUsers",(users)=>{
    //   console.log(users);
    //  })
    console.log("sockect connected", socket.connected);
    return () => {
      socket.disconnect();
      clearInterval(clear);
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      settMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user._id);
  }, [user]);

  const getMessages = async () => {
    try {
      console.log("called", currentChat);
      const res = await axios.get("/message/" + currentChat._id);
      settMessages(await res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("fetch messages...");
    getMessages();
    console.log("new messages: ", messages);
  }, [currentChat]);

  const getConversations = async () => {
    try {
      const res = await axios("/conversation/" + user._id);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConversations();
  }, [user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/message", message);
      const mess = await res.data;
      settMessages((pastmessages) => [...pastmessages, mess]);
      setNewMesage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {currentChat?.members.map((user, i) => <TestUser user={user} key={i} isonline={onlineusers} />)}
            {/* {members.map((user, i) => <ChatOnline key={i} user={user} isonline={onlineusers.includes(user._id)} />)} */}
            
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, i) => (
                    <div key={i} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something...."
                    onChange={(e) => setNewMesage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                start anew conversation..
              </span>
            )}
          </div>
        </div>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput" />

            {conversations.map((c, i) => (
              <div key={i} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;


const TestUser = ({ user, isonline }) => {
  return (<div >{user} | {isonline.includes(user) ? "online" : "offline"}</div>)
}