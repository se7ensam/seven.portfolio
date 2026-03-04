import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { themes } from '../data/themes';
import './Navbar.css';

const ThreeDice = lazy(() => import('./ThreeDice'));

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

    const scrollTick = useRef(false);
    const handleScroll = useCallback(() => {
        if (scrollTick.current) return;
        scrollTick.current = true;
        requestAnimationFrame(() => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
            scrollTick.current = false;
        });
    }, []);

    useEffect(() => {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (themes[savedTheme]) {
            applyTheme(savedTheme);
        } else {
            applyTheme('dark');
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

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

                    <Suspense fallback={<span className="dice-fallback" title="Roll for Theme">🎲</span>}>
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
                    </Suspense>
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
