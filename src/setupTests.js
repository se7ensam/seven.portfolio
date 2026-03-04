import '@testing-library/jest-dom';

// ResizeObserver Polyfill for Three.js / React Three Fiber
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};
