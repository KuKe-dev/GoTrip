// src/components/news/NewsPopup.jsx
import React from "react";
import "./NewsPopup.css";

const dummyNews = [
  {
    title: "Descubre los rincones ocultos de Tailandia",
    description: "Una guía para los viajeros más curiosos",
    date: "Hoy"
  },

  {
    title: "Top 10 mejores restaurantes en Madrid",
    description: "Disfruta la comida como nunca.",
    date: "23 Abr"
  },
  {
    title: "Vuelos baratos a Islandia",
    description: "Oferta limitada por tiempo",
    date: "Ayer"
  },
  {
    title: "Top 10 playas secretas de Europa",
    description: "¿Las conocías todas?",
    date: "23 Abr"
  }
  
];

const NewsPopup = ({ onClose }) => {
  return (
    <div className="news-popup">
      <div className="news-header">
        <h3>Noticias</h3>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="news-list">
        {dummyNews.map((news, index) => (
      
      <div className="news-item">
        <h4 className="news-title">{news.title}</h4>
        <p className="news-description">{news.description}</p> {/* Aplica clase aquí */}
        <span className="news-date">{news.date}</span>
      </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPopup;
