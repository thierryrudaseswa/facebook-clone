import React from 'react';
import './chatOnline.css';

function ChatOnline({ user, isonline }) {
  if (isonline) {
    return (
      <div className="chatOnline">
          <div className="chatOnlineFriend">
              <div className="chatOnlineImgContainer">
                  <img src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  className='chatOnlineImg' alt="" />
                  <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">John Doe</span>
          </div>
      </div>
    )

  } else {
    return null
  }
}

export default ChatOnline;