import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Projects />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
