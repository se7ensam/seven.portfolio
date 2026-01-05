import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import './Projects.css';

const Projects = () => {
    return (
        <section id="projects" className="section container">
            <h2 className="section-title">Some Things I've Built</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
