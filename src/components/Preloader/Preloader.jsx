import React from "react";
import "./Preloader.css";

function Preloader({ message = "Processing your file..." }) {
  return (
    <div className="preloader">
      <div className="preloader__overlay">
        <div className="preloader__content">
          <div className="preloader__spinner">
            <div className="preloader__spinner-ring"></div>
            <div className="preloader__spinner-ring"></div>
            <div className="preloader__spinner-ring"></div>
          </div>
          <h2 className="preloader__title">Analyzing Your Lecture</h2>
          <p className="preloader__message">{message}</p>
          <div className="preloader__progress">
            <div className="preloader__progress-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
