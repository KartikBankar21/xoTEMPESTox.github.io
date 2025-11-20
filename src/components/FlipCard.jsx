import React, { useState } from 'react';
import './FlipCard.css';

export const FlipCard = ({ project, onCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const {
    badge,
    title,
    subtitle,
    frontImage,
    viewDetailsText = "View Details →",
    techStack = [],
    websiteText = "Website",
    clickForMore = "Click for more →"
  } = project;

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <div 
      className="flip-card-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleClick}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="flip-card-face flip-card-front">
          {badge && <div className="flip-card-badge">{badge}</div>}
          
          <div className="flip-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>

          {frontImage && (
            <div className="flip-card-front-image">
              <img src={frontImage} alt={title} />
            </div>
          )}

          <h3 className="flip-card-title">{title}</h3>
          <p className="flip-card-subtitle">{subtitle}</p>

          <button className="flip-card-view-details">{viewDetailsText}</button>
        </div>

        {/* Back Face */}
        <div className="flip-card-face flip-card-back">
          <h3 className="flip-card-back-title">Tech Stack</h3>
          
          <div className="flip-card-tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="flip-card-tech-item">
                {tech.icon && <span className="flip-card-tech-icon">{tech.icon}</span>}
                <span className="flip-card-tech-name">{tech.name}</span>
              </div>
            ))}
          </div>

          <div className="flip-card-back-footer">
            <span className="flip-card-website-label">{websiteText}</span>
            <span className="flip-card-click-more">{clickForMore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Card Modal Component
const ProjectCard = ({ project, onClose }) => {
  const {
    title,
    subtitle,
    description,
    techStack = [],
    highlights = [],
    website
  } = project;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="project-card">
          <div className="project-card-header">
            <div className="project-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="project-card-title-section">
              <h2 className="project-card-title">{title}</h2>
              <p className="project-card-subtitle">{subtitle}</p>
            </div>
            <button className="project-card-close" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="15" y1="5" x2="5" y2="15"></line>
                <line x1="5" y1="5" x2="15" y2="15"></line>
              </svg>
            </button>
          </div>

          <div className="project-card-content">
            <section className="project-card-section">
              <h3 className="project-card-section-title">Description</h3>
              <p className="project-card-description">{description}</p>
            </section>

            <section className="project-card-section">
              <h3 className="project-card-section-title">Tech Stack</h3>
              <div className="project-card-tech-stack">
                {techStack.map((tech, index) => (
                  <div key={index} className="tech-badge">
                    {tech.icon && <span className="tech-icon">{tech.icon}</span>}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="project-card-section">
              <h3 className="project-card-section-title">Key Highlights</h3>
              <ul className="project-card-highlights">
                {highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>

            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="project-card-website">
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};