import React from 'react';
import './styles/VideoCard.css';

function VideoCard({ title, img }) {
  return (
    <div className="video-card">
      <img src={img} alt={title} className="video-image" />
      <h3 className="video-title">{title}</h3>
      <div className="video-actions">
        <button className="video-button">BORRAR</button>
        <button className="video-button">EDITAR</button>
      </div>
    </div>
  );
}

export default VideoCard;
