import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaPaperPlane } from 'react-icons/fa';

const WishesSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #FF6B95 0%, #FF8E8E 100%);
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
`;

const WishesContainer = styled.div`
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

const WishForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  resize: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: white;
  }
`;

const SubmitButton = styled(motion.button)`
  background: white;
  color: #FF6B95;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const WishesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const WishCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
`;

const WishText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: white;
`;

const WishDate = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  display: block;
  text-align: right;
`;

const HeartIcon = styled(FaHeart)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: rgba(255, 255, 255, 0.3);
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

// Sample wishes data
const initialWishes = [
  {
    id: 1,
    text: '紫薇，愿你如织女星般闪耀，照亮自己的人生道路。无论遇到什么困难，都能勇敢面对，保持乐观！',
    date: '2023-08-22'
  },
  {
    id: 2,
    text: '七夕快乐！希望紫薇每天都能开心笑容，像星星一样明亮！生活中的困难都会过去，美好的日子永远在前方等着你！',
    date: '2023-08-21'
  },
  {
    id: 3,
    text: '亲爱的紫薇，愿你的生活如鹊桥相会般美好，充满爱与希望。永远保持那份单纯善良的心！',
    date: '2023-08-20'
  },
];

const Wishes = () => {
  const [wishes, setWishes] = useState(initialWishes);
  const [newWish, setNewWish] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newWish.trim() === '') return;
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    const wish = {
      id: wishes.length + 1,
      text: newWish,
      date: formattedDate
    };
    
    setWishes([wish, ...wishes]);
    setNewWish('');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  return (
    <WishesSection id="wishes">
      <WishesContainer>
        <SectionTitle
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          七夕祝福
        </SectionTitle>
        
        <WishForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FormTitle>送上你的祝福</FormTitle>
          
          <AnimatePresence>
            {showSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaStar color="#FFD700" />
                祝福已发送！感谢你的美好祝愿
                <FaStar color="#FFD700" />
              </SuccessMessage>
            )}
          </AnimatePresence>
          
          <TextArea
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            placeholder="写下你对紫薇的祝福..."
            required
          />
          
          <SubmitButton
            type="submit"
            disabled={newWish.trim() === ''}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane />
            发送祝福
          </SubmitButton>
        </WishForm>
        
        <WishesGrid>
          {wishes.map((wish, index) => (
            <WishCard
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }}
            >
              <HeartIcon />
              <WishText>{wish.text}</WishText>
              <WishDate>{wish.date}</WishDate>
            </WishCard>
          ))}
        </WishesGrid>
      </WishesContainer>
    </WishesSection>
  );
};

export default Wishes;