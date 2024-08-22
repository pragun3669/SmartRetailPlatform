import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './VirtualTryOn.css';

const VirtualTryOn = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedOverlay, setSelectedOverlay] = useState('./glasses.png'); // Default overlay
  const webcamRef = useRef(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  const overlayOptions = [
    './glasses.png',
    './hat.png',
    './mask.png',
    './scarf.png'
  ];

  return (
    <div className="container">
      <div className="camera-section">
        <h1>Virtual Try-On</h1>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="640"
          height="480"
          className="webcam"
        />
        <button onClick={capture}>Capture</button>
        {imageSrc ? (
          <div className="captured-image-container">
            <img src={imageSrc} alt="User" className="captured-image" />
            <img
              src={selectedOverlay}
              alt="Overlay"
              className="overlay"
            />
          </div>
        ) : (
          <p>No image captured</p>
        )}
      </div>

      <div className="overlay-selection">
        <h2>Select an Overlay</h2>
        <div className="overlay-options">
          {overlayOptions.map((overlay, index) => (
            <img
              key={index}
              src={overlay}
              alt={`Overlay ${index}`}
              className="overlay-option"
              onClick={() => setSelectedOverlay(overlay)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
