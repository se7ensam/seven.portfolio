import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-image">
                <img src={project.image} alt={project.title} />
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
};

export default ProjectCard;
