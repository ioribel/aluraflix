import React, { useState } from 'react';
import './App.css';
import image1 from './assets/image 7.png';
import image2 from './assets/backend.png';
import image3 from './assets/backendGroup 7.png';
import image4 from './assets/VideoCard.png';
import image5 from './assets/fonted js.png';
import image6 from './assets/image 7-3.png';
import image7 from './assets/image 7-4.png';

const EditModal = ({ isOpen, onClose, onSave, videoData }) => {
  const [editData, setEditData] = useState(videoData);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>EDITAR CARD:</h2>
        <button className="close-button" onClick={onClose}>✖</button>
        <form>
          <label>
            Título
            <input type="text" name="title" value={editData.title} onChange={handleChange} />
          </label>
          <label>
            Categoría
            <select name="category" value={editData.category} onChange={handleChange}>
              <option value="FRONT END">FRONT END</option>
              <option value="BACK END">BACK END</option>
            </select>
          </label>
          <label>
            Imagen
            <input type="text" name="image" value={editData.image} onChange={handleChange} />
          </label>
          <label>
            Video
            <input type="text" name="video" value={editData.video || ''} onChange={handleChange} />
          </label>
          <label>
            Descripción
            <textarea name="subtitle" value={editData.subtitle || ''} onChange={handleChange} />
          </label>
          <div className="button-group">
            <button type="button" onClick={handleSave}>GUARDAR</button>
            <button type="button" onClick={() => setEditData(videoData)}>LIMPIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NewVideoForm = ({ isOpen, onClose, onSave, categories }) => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    subtitle: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newVideo);
    setNewVideo({ title: '', category: '', image: '', video: '', subtitle: '' });
    onClose();
  };

  const handleClear = () => {
    setNewVideo({ title: '', category: '', image: '', video: '', subtitle: '' });
  };

  return (
    <div className="new-video-form">
      <h1>NUEVO VIDEO</h1>
      <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO</p>
      <h2>Crear Tarjeta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Título
            <input
              type="text"
              name="title"
              value={newVideo.title}
              onChange={handleChange}
              placeholder="ingrese el título"
              required
            />
          </label>
          <label>
            Categoría
            <select
              name="category"
              value={newVideo.category}
              onChange={handleChange}
              required
            >
              <option value="">seleccione una categoría</option>
              {categories.map(cat => (
                <option key={cat.title} value={cat.title}>{cat.title}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Imagen
            <input
              type="text"
              name="image"
              value={newVideo.image}
              onChange={handleChange}
              placeholder="el enlace es obligatorio"
              required
            />
          </label>
          <label>
            Video
            <input
              type="text"
              name="video"
              value={newVideo.video}
              onChange={handleChange}
              placeholder="ingrese el enlace del video"
            />
          </label>
        </div>
        <label>
          Descripción
          <textarea
            name="subtitle"
            value={newVideo.subtitle}
            onChange={handleChange}
            placeholder="¿de qué se trata este video?"
          />
        </label>
        <div className="button-group">
          <button type="submit">GUARDAR</button>
          <button type="button" onClick={handleClear}>LIMPIAR</button>
        </div>
      </form>
    </div>
  );
};

const VideoCard = ({ title, subtitle, image, category, onEdit }) => (
  <div className="video-card">
    <img src={image} alt={title} />
    <div className="video-info">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
    <div className="video-actions">
      <button className="icon-button">🏠</button>
      <button className="icon-button" onClick={onEdit}>✏️</button>
    </div>
  </div>
);

const CategorySection = ({ title, videos, onEditVideo }) => (
  <div className="category-section">
    <h2>{title}</h2>
    <div className="video-grid">
      {videos.map((video, index) => (
        <VideoCard key={index} {...video} category={title} onEdit={() => onEditVideo(video)} />
      ))}
    </div>
  </div>
);

const App = () => {
  const [categories, setCategories] = useState([
    {
      title: "FRONT END",
      videos: [
        { title: "Challenge React", subtitle: "¿QUÉ SIGNIFICA PENSAR COMO PROGRAMADOR?", image: image1 },
        { title: "¿CUÁNDO USAR LET, VAR Y CONST?", subtitle: "", image: image4 },
        { title: "¿QUÉ ES JAVASCRIPT?", subtitle: "", image: image5 },
        { title: "Equipo Front End", subtitle: "", image: image6 },
      ]
    },
    {
      title: "BACK END",
      videos: [
        { title: "SPRING FRAMEWORK", subtitle: "", image: image2 },
        { title: "¿QUÉ ES SQL Y NOSQL?", subtitle: "", image: image3 },
        { title: "CONOCE LOS ENUM", subtitle: "", image: image7 },
      ]
    }
  ]);

  const [isNewVideoFormOpen, setIsNewVideoFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const handleEditVideo = (video) => {
    setEditingVideo(video);
  };

  const handleSaveEdit = (editedVideo) => {
    const updatedCategories = categories.map(category => ({
      ...category,
      videos: category.videos.map(video => 
        video === editingVideo ? editedVideo : video
      )
    }));
    setCategories(updatedCategories);
    setEditingVideo(null);
  };

  const handleAddNewVideo = (newVideo) => {
    const updatedCategories = categories.map(category => {
      if (category.title === newVideo.category) {
        return {
          ...category,
          videos: [...category.videos, newVideo]
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  return (
    <div className="app">
      <header>
        <h1>ALURAFLIX</h1>
        <nav>
          <button>HOME</button>
          <button onClick={() => setIsNewVideoFormOpen(true)}>NUEVO VIDEO</button>
        </nav>
      </header>
      <main>
        {categories.map((category, index) => (
          <CategorySection 
            key={index} 
            {...category} 
            onEditVideo={handleEditVideo}
          />
        ))}
      </main>
      <NewVideoForm 
        isOpen={isNewVideoFormOpen}
        onClose={() => setIsNewVideoFormOpen(false)}
        onSave={handleAddNewVideo}
        categories={categories}
      />
      <EditModal 
        isOpen={editingVideo !== null}
        onClose={() => setEditingVideo(null)}
        onSave={handleSaveEdit}
        videoData={editingVideo || {}}
      />
      <footer>
        <h1>ALURAFLIX</h1>
      </footer>
    </div>
  );
};

export default App;
