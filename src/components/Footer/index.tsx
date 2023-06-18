import styles from './styles/footer.module.css';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToJoyfa = () => {
    window.open('https://joyfa.io', '_blank');
  };

  return (
    <footer className={styles['footer']}>
      <a className={styles['return-to-home']} onClick={handleReturnToJoyfa}>
        Return to joyfa.io
      </a>
    </footer>
  );
};
