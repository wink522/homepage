import { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

// Import components
import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Wishes from './components/Wishes';
import Footer from './components/Footer';
import Background from './components/Background';

const AppContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
`;

function App() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.body.addEventListener('click', handleAnchorClick);
    return () => document.body.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <AppContainer>
      <Background />
      <Header />
      <Hero />
      <Story />
      <Wishes />
      <Footer />
    </AppContainer>
  )
}

export default App
