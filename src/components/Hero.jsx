import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import heartSvg from '../assets/images/heart.svg';
import starSvg from '../assets/images/star.svg';
import Fireworks from './Fireworks';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #FF6B95 0%, #FFB8C6 100%);
  padding: 2rem;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 10;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #FFF, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeartContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const StarsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Button = styled(motion.button)`
  background: white;
  color: #FF6B95;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Hero = () => {
  const heartsRef = useRef(null);
  const starsRef = useRef(null);
  const [showFireworks, setShowFireworks] = useState(false);
  
  useEffect(() => {
    // Create floating hearts animation
    const heartsContainer = heartsRef.current;
    const starsContainer = starsRef.current;
    
    // Create hearts
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('img');
      heart.src = heartSvg;
      heart.style.position = 'absolute';
      heart.style.width = `${Math.random() * 30 + 20}px`;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.opacity = '0';
      heartsContainer.appendChild(heart);
      
      // Animate each heart
      gsap.to(heart, {
        opacity: Math.random() * 0.6 + 0.2,
        duration: 2,
        delay: i * 0.2,
      });
      
      gsap.to(heart, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${Math.random() * 50 - 25}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    
    // Create stars
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('img');
      star.src = starSvg;
      star.style.position = 'absolute';
      star.style.width = `${Math.random() * 15 + 5}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = '0';
      starsContainer.appendChild(star);
      
      // Animate each star
      gsap.to(star, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: 2,
        delay: i * 0.1,
      });
      
      // Twinkle animation
      gsap.to(star, {
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(heartsContainer.children);
      gsap.killTweensOf(starsContainer.children);
    };
  }, []);
  
  return (
    <HeroSection id="home">
      <HeartContainer ref={heartsRef} />
      <StarsContainer ref={starsRef} />
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          七夕之恋 ❤ 紫薇
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          亲爱的紫薇，生活虽有困难，我们一起微笑面对，
          愿你的笑容如星河璀璨，照亮每一个日子。
          七夕佳节，愿我们的爱情如鹊桥相会，永不分离。
        </Subtitle>
        <Button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFireworks(true)}
        >
          点我有惊喜
        </Button>
        
        <Fireworks 
          show={showFireworks} 
          onComplete={() => setShowFireworks(false)} 
        />
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;