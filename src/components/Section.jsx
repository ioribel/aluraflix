import React from 'react';
import './styles/Section.css';
import VideoCard from './VideoCard';

function Section({ title, videos }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={index} title={video.title} img={video.img} />
        ))}
      </div>
    </section>
  );
}

export default Section;
