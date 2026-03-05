import React, { memo } from 'react';
import './ProjectCard.css';

const ProjectCard = memo(function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
            </div>
            <div className="project-content">
                <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-links">
                        {/* Links disabled */}
                    </div>
                </div>
                <div className="project-description">
                    <p>{project.description}</p>
                </div>
                <ul className="project-tech-list">
                    {project.tech.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export default ProjectCard;
