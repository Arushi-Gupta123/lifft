import React, { useEffect, useState } from "react";
import gallery from "../../assets/gallery.jpg";
import "./Gallery.css";

const Gallery = () => {
  const [media, setMedia] = useState({ images: [], videos: [] });

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Arushi-Gupta123/liftt/main/galleryData.json") // Fetch from public folder
      .then((response) => response.json())
      .then((data) => setMedia(data))
      .catch((error) => console.error("Error loading gallery data:", error));
  }, []);

  return (
    <div className="gallery-container">
      {/* Header with Overlay */}
      <div className="header-image">
        <img src={gallery} alt="Gallery Header" className="header-img" />
        <div className="overlay-text">Visual Gallery</div>
      </div>

      {/* Image Section */}
      <div className="section">
        <div className="media-row">
          {media.images.map((img, index) => (
            <img key={index} src={img} alt={`Gallery ${index}`} className="media-img" />
          ))}
        </div>
        <p className="media-section-description">Modern Lift Design</p>
      </div>

      {/* Video Section */}
      <div className="section">
        <div className="media-row">
          {media.videos.map((vid, index) => (
            <video key={index} src={vid} controls className="media-video" />
          ))}
        </div>
        <p className="media-section-description">Residential Lift Tour</p>
      </div>
    </div>
  );
};

export default Gallery;
