import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const particleCount = 50;
  const particles = Array.from({ length: particleCount }).map((_, i) => (
    <div key={i} className="particle"></div>
  ));

  return (
    <div className="background-container">
      {/* Grade de Neon */}
      <div className="absolute inset-0 neon-grid"></div>
      {/* Gradiente para suavizar a parte de baixo */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
      <div className="particles">{particles}</div>
    </div>
  );
};

export default AnimatedBackground;