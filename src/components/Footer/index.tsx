import styles from './styles/footer.module.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as TwitterSVG } from 'src/assets/icon-twitter.svg';
import { ReactComponent as InstagramSVG } from 'src/assets/icon-instagram.svg';
import { ReactComponent as DiscordSVG } from 'src/assets/icon-discord.svg';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleJoyfa = () => {
    window.open('https://joyfa.io', '_blank');
  };
  const handleMyStudio = () => {
    window.open('https://mystudio.joyfa.io/', '_blank');
  };
  const handleTerms = () => {
    window.open('https://www.joyfa.io/terms', '_blank');
  };
  const handleContact = () => {
    window.open('https://www.joyfa.io/contact-us', '_blank');
  };
  const handleTwitter = () => {
    window.open('https://twitter.com/Joyfa_official', '_blank');
  };
  const handleInstagram = () => {
    window.open('https://www.instagram.com/joyfa_official/', '_blank');
  };
  const handleDiscord = () => {
    window.open('https://discord.gg/mEMv7xAG6u', '_blank');
  };
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-first']}>
        <div className={styles['footer-first-links']}>
          <a onClick={handleJoyfa}>joyfa.io</a>
          <a onClick={handleMyStudio}>My Studio</a>
          <a onClick={handleTerms}>Terms</a>
          <a onClick={handleContact}>Contact Us</a>
        </div>
      </div>
      <div className={styles['footer-second']}>
        <div className={styles['footer-copyright']}>
          © Copyright 2023 - Joyfa
        </div>
        <div className={styles['footer-social']}>
          <a onClick={handleTwitter}>
            <TwitterSVG />
          </a>
          <a onClick={handleInstagram}>
            <InstagramSVG />
          </a>
          <a onClick={handleDiscord}>
            <DiscordSVG />
          </a>
        </div>
      </div>
    </footer>
  );
};
