import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { themes } from '../data/themes';
import './Navbar.css';

const ThreeDice = lazy(() => import('./ThreeDice'));

const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('dark');

    const applyTheme = useCallback((themeKey) => {
        const theme = themes[themeKey];
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        setCurrentTheme(themeKey);
        localStorage.setItem('theme', themeKey);
    }, []);

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
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (themes[savedTheme]) {
            applyTheme(savedTheme);
        } else {
            applyTheme('dark');
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [applyTheme, handleScroll]);

    const randomizeTheme = useCallback(() => {
        const themeKeys = Object.keys(themes);
        const availableThemes = themeKeys.filter(key => key !== currentTheme);
        const randomKey = availableThemes[Math.floor(Math.random() * availableThemes.length)];
        applyTheme(randomKey);
    }, [currentTheme, applyTheme]);

    const diceColors = useMemo(() => {
        const theme = themes[currentTheme];
        const isLight = theme?.type === 'light';
        return {
            bodyColor: isLight ? theme?.colors?.['--bg-primary'] : theme?.colors?.['--text-primary'] || '#fafafa',
            dotColor: isLight ? theme?.colors?.['--text-primary'] : theme?.colors?.['--bg-primary'] || '#111',
        };
    }, [currentTheme]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#" className="logo">
                    Portfolio<span>.</span>
                </a>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {NAV_LINKS.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="nav-number">0{index + 1}.</span>
                            {link.name}
                        </a>
                    ))}

                    <Suspense fallback={<span className="dice-fallback" title="Roll for Theme">🎲</span>}>
                        <ThreeDice
                            onClick={randomizeTheme}
                            bodyColor={diceColors.bodyColor}
                            dotColor={diceColors.dotColor}
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
