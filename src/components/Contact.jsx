import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section section container">
            <h2 className="section-title text-center">Get In Touch</h2>
            <p className="contact-description text-center">
                I'm currently looking for new opportunities in Cloud-Native Backend Systems and AI. my inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="contact-cta text-center">
                <a href="mailto:sambitsrcm@gmail.com" className="btn btn-primary contact-btn">Say Hello</a>
            </div>

            <div className="contact-info text-center" style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
                <p>Cuttack, India</p>
            </div>

            <footer className="footer text-center">
                <p>Designed & Built by Sambit Mohanty</p>
                <div className="social-links" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <a href="https://www.linkedin.com/in/sevensm/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>LinkedIn</a>
                    <a href="mailto:sambitsrcm@gmail.com" style={{ color: 'inherit' }}>Email</a>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
