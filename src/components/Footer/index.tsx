import styles from './styles/footer.module.css';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles['footer']}>
      <a className={styles['return-to-home']} onClick={() => navigate('/')}>
        RETURN TO HOME
      </a>
    </footer>
  );
};
