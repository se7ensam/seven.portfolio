import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Hero = () => {
    return (
        <section id="about" className="hero-section container">
            <motion.div
                className="hero-content"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.p variants={item} className="hero-greeting">
                    Hi, my name is
                </motion.p>
                <motion.h1 variants={item} className="hero-title">
                    Sambit Mohanty.
                </motion.h1>
                <motion.h2 variants={item} className="hero-subtitle">
                    I build Cloud-Native & AI-Driven Systems.
                </motion.h2>
                <motion.p variants={item} className="hero-description">
                    I'm an Oracle Certified Architect and Software Engineer specializing in backend systems and AI solutions.
                    Expertise in Multicloud architectures, scalable RAG applications using Neo4j and Vector Search, and Node.js.
                </motion.p>
                <motion.div variants={item} className="hero-cta">
                    <a href="#projects" className="btn btn-primary">Check out my work!</a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
