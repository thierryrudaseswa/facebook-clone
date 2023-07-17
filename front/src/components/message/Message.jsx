import React from 'react';
import './message.css';
import {format} from "timeago.js"

function Message({own,message}) {
  return (
    <div className={own ? "message own" : "message"} >
        <div className="messageTop"> 
        <img src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className='messageImg' />
        <p className="messageText">
            {message.text}
        </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message