import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #6B4984 0%, #9B6FCC 100%);
  padding: 3rem 2rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const FooterTitle = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #FFD700;
`;

const FooterText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeartIcon = styled(FaHeart)`
  color: #FF6B95;
  margin: 0 0.5rem;
`;

const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Star = styled(motion.div)`
  position: absolute;
  color: rgba(255, 215, 0, 0.3);
  font-size: ${props => props.size}px;
`;

const Copyright = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Footer = () => {
  // Generate random stars
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 15 + 5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));
  
  return (
    <FooterContainer>
      <StarBackground>
        {stars.map(star => (
          <Star
            key={star.id}
            style={{ top: star.top, left: star.left }}
            size={star.size}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
              ease: 'easeInOut'
            }}
          >
            <FaStar />
          </Star>
        ))}
      </StarBackground>
      
      <FooterContent>
        <FooterTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          永远的七夕之约
        </FooterTitle>
        
        <FooterText
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          亲爱的紫薇，愿我们的爱情如牛郎织女，虽有银河阻隔，却能在七夕相会；
          愿你永远保持单纯善良的心，乐观面对生活中的每一个挑战；
          愿你的笑容永远如星河璀璨，照亮每一个日子。
        </FooterText>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          用 <HeartIcon /> 编织的七夕之恋
        </motion.div>
        
        <Copyright>
          © {new Date().getFullYear()} 七夕之恋 | 为紫薇特别定制
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;