import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const FireworksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const LoveText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 20px #FF6B95, 0 0 40px #FF6B95;
  opacity: 0;
  z-index: 101;
  pointer-events: none;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

class Particle {
  constructor(canvas, x, y, color) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 6 - 3
    };
    this.gravity = 0.05;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.01;
  }

  update() {
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;
    return this.alpha > 0;
  }

  draw() {
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }
}

class Firework {
  constructor(canvas, targetX, targetY) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetX = targetX || Math.random() * canvas.width;
    this.targetY = targetY || Math.random() * canvas.height / 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.radius = 2;
    this.velocity = {
      x: (this.targetX - this.x) / 100,
      y: (this.targetY - this.y) / 100
    };
    this.particles = [];
    this.reachedTarget = false;
  }

  update() {
    if (!this.reachedTarget) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Check if reached target
      const distance = Math.sqrt(
        Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2)
      );

      if (distance < 5) {
        this.explode();
        this.reachedTarget = true;
      }
      return true;
    } else {
      // Update particles
      this.particles = this.particles.filter(particle => particle.update());
      return this.particles.length > 0;
    }
  }

  explode() {
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas, this.x, this.y, this.color));
    }
  }

  draw() {
    if (!this.reachedTarget) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    } else {
      // Draw particles
      this.particles.forEach(particle => particle.draw());
    }
  }
}

const Fireworks = ({ show, onComplete }) => {
  // Convert show prop to isVisible for styled component
  const isVisible = show ? true : false;
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const fireworksRef = useRef([]);
  const animationRef = useRef(null);
  const textShown = useRef(false);
  
  // 重置textShown状态，确保每次都能触发烟花效果
  useEffect(() => {
    if (!show) {
      textShown.current = false;
    }
  }, [show]);
  
  // Reset and start animation when show changes
  useEffect(() => {
    if (isVisible) {
      startFireworks();
      
      // 添加点击事件监听器
      const handleClick = () => {
        // 只有当文字显示后才响应点击
        if (textShown.current) {
          if (onComplete) onComplete();
        }
      };
      
      window.addEventListener('click', handleClick);
      
      // 清理函数
      return () => {
        window.removeEventListener('click', handleClick);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      // Clean up
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    // 这个return已经在上面的if分支中处理了
  }, [show]);
  
  const startFireworks = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const textElement = textRef.current;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear fireworks array
    fireworksRef.current = [];
    
    // Animation loop
    const animate = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw fireworks
      fireworksRef.current = fireworksRef.current.filter(firework => {
        firework.update();
        firework.draw();
        return !firework.reachedTarget || firework.particles.length > 0;
      });
      
      // Add new fireworks randomly
      if (Math.random() < 0.05 && fireworksRef.current.length < 8) {
        fireworksRef.current.push(new Firework(canvas));
      }
      
      animationRef.current = requestAnimationFrame(animate);
      
      // If no more fireworks and text animation is done, complete
      if (fireworksRef.current.length === 0 && textElement.style.opacity === '0') {
        cancelAnimationFrame(animationRef.current);
        if (onComplete) onComplete();
      }
    };
    
    // Start animation
    animate();
    
    // Create special fireworks in the center for the text
    setTimeout(() => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 50;
      
      // Create a heart shape of fireworks
      const heartPoints = [];
      const scale = Math.min(canvas.width, canvas.height) * 0.2;
      
      for (let i = 0; i < 20; i++) {
        const t = i / 20 * Math.PI * 2;
        const x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
        const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        heartPoints.push({ x, y });
      }
      
      // Launch fireworks to heart points
      heartPoints.forEach((point, i) => {
        setTimeout(() => {
          fireworksRef.current.push(new Firework(canvas, point.x, point.y));
        }, i * 100);
      });
      
      // Show the text
      setTimeout(() => {
        gsap.to(textElement, {
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
          onComplete: () => {
            // 标记文字已显示，可以响应点击
            textShown.current = true;
          }
        });
      }, 2000);
    }, 1000);
  };
  
  return (
    <FireworksContainer className={isVisible ? 'visible' : 'hidden'} style={{ display: isVisible ? 'block' : 'none' }}>
      <Canvas ref={canvasRef} />
      <LoveText ref={textRef}>I Love You</LoveText>
    </FireworksContainer>
  );
};

export default Fireworks;