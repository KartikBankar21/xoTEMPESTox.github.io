import React from 'react';
import './ProjectCard.css';

export const ProjectCard = ({ project, onClose }) => {
  const {
    title,
    subtitle,
    description,
    techStack = [],
    highlights = [],
    website
  } = project;

  return (
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
        {onClose && (
          <button className="project-card-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="15" y1="5" x2="5" y2="15"></line>
              <line x1="5" y1="5" x2="15" y2="15"></line>
            </svg>
          </button>
        )}
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
  );
};