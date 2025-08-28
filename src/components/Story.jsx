import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import magpieSvg from '../assets/images/magpie.svg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StorySection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #6B4984 0%, #9B6FCC 100%);
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
`;

const StoryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  color: white;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(to right, #FFF, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StoryTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #FFD700;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const MagpieContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Story = () => {
  const magpiesRef = useRef(null);
  const cardsRef = useRef([]);
  
  useEffect(() => {
    // Create magpies animation
    const magpiesContainer = magpiesRef.current;
    
    // Create magpies
    for (let i = 0; i < 8; i++) {
      const magpie = document.createElement('img');
      magpie.src = magpieSvg;
      magpie.style.position = 'absolute';
      magpie.style.width = `${Math.random() * 40 + 30}px`;
      magpie.style.left = `${Math.random() * 100}%`;
      magpie.style.top = `${Math.random() * 100}%`;
      magpie.style.opacity = '0';
      magpiesContainer.appendChild(magpie);
      
      // Animate each magpie
      gsap.to(magpie, {
        opacity: Math.random() * 0.7 + 0.3,
        duration: 2,
        delay: i * 0.3,
      });
      
      // Flying animation
      gsap.to(magpie, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 20 - 10,
        duration: Math.random() * 30 + 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    
    // Scroll animations for cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(magpiesContainer.children);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Add cards to ref
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  
  return (
    <StorySection id="story">
      <MagpieContainer ref={magpiesRef} />
      <StoryContainer>
        <SectionTitle
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          我们的故事
        </SectionTitle>
        
        <StoryCard ref={addToRefs}>
          <StoryTitle>相遇</StoryTitle>
          <StoryText>
            在这个世界的某个角落，我们相遇了。就像牛郎与织女，跨越银河，终于在七夕相会。
            紫薇，你的笑容如同星辰般璀璨，照亮了我的世界。
          </StoryText>
        </StoryCard>
        
        <StoryCard ref={addToRefs}>
          <StoryTitle>相知</StoryTitle>
          <StoryText>
            与你接触的这些日子里，我知道，你是一个善良美丽的女孩，能与你走到一起将会是我一生的幸运。
          </StoryText>
        </StoryCard>
        
        <StoryCard ref={addToRefs}>
          <StoryTitle>相守</StoryTitle>
          <StoryText>
            亲爱的紫薇，无论生活多么艰难，请记住我会一直在你身边。
            就像牛郎织女的爱情跨越银河，我们的爱也能跨越一切困难。
            愿你永远保持那份单纯善良的心，永远开心，永远幸福。
          </StoryText>
        </StoryCard>
        
        <StoryCard ref={addToRefs}>
          <StoryTitle>七夕祝福</StoryTitle>
          <StoryText>
            在这个特别的七夕节，我想对你说：
            生活虽有起伏，但请保持乐观；
            困难只是暂时的，而我们的爱是永恒的；
            愿你的每一天都充满阳光，就像你的笑容一样灿烂；
            愿我们的爱情，如鹊桥相会，永不分离。
          </StoryText>
        </StoryCard>
      </StoryContainer>
    </StorySection>
  );
};

export default Story;