// src/components/chat/ChatPopup.jsx
import React from "react";
import "./ChatPopup.css";

const dummyChats = [
  {
    name: "Juan",
    lastMessage: "¿Que lugares de alli me recomiendas visitar?",
    time: "7:30 PM",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "ESCAPADA AMIGOS",
    lastMessage: "Hada: Chicos ya tenemos los billetes!",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Miguel",
    lastMessage: "Te recomendaría mucho ir a visitar el monumento de la Torre Eiffel. ",
    time: "Mar 25",
    avatar: "https://i.pravatar.cc/150?img=68"
  }
  
];

const ChatPopup = ({ onClose }) => {
  return (
    <div className="chat-popup">
      <div className="chat-header">
        <h3>Mensajes</h3>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="chat-list">
        {dummyChats.map((chat, idx) => (
          <div key={idx} className="chat-item">
            <img src={chat.avatar} alt="Avatar" className="avatar" />
            <div className="chat-info">
              <strong>{chat.name}</strong>
              <p>{chat.lastMessage}</p>
            </div>
            <span className="chat-time">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPopup;
