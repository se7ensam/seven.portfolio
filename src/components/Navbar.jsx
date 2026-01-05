import React, { useState, useEffect } from 'react';
import { themes } from '../data/themes';
import ThreeDice from './ThreeDice';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('dark');

    const applyTheme = (themeKey) => {
        const theme = themes[themeKey];
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        setCurrentTheme(themeKey);
        localStorage.setItem('theme', themeKey);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (themes[savedTheme]) {
            applyTheme(savedTheme);
        } else {
            applyTheme('dark');
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const randomizeTheme = () => {
        const themeKeys = Object.keys(themes);
        // Filter out current theme to ensure change
        const availableThemes = themeKeys.filter(key => key !== currentTheme);
        const randomKey = availableThemes[Math.floor(Math.random() * availableThemes.length)];
        applyTheme(randomKey);
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#" className="logo">
                    Portfolio<span>.</span>
                </a>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="nav-number">0{navLinks.indexOf(link) + 1}.</span>
                            {link.name}
                        </a>
                    ))}

                    <ThreeDice
                        onClick={randomizeTheme}
                        bodyColor={
                            themes[currentTheme]?.type === 'light'
                                ? themes[currentTheme]?.colors?.['--bg-primary']
                                : themes[currentTheme]?.colors?.['--text-primary'] || '#fafafa'
                        }
                        dotColor={
                            themes[currentTheme]?.type === 'light'
                                ? themes[currentTheme]?.colors?.['--text-primary']
                                : themes[currentTheme]?.colors?.['--bg-primary'] || '#111'
                        }
                    />
                </div>

                <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
