import styles from './styles/menu-link.module.css';
import { useNavigate } from 'react-router-dom';

export type MenuLinkProps = {
  text: string;
  link: string;
};

export const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const { text, link } = props;
  const navigate = useNavigate();
  return (
    <a className={styles['menu-link']} onClick={() => navigate(link)}>
      {text}
    </a>
  );
  // return (
  //   <a className={styles['menu-link']} href={href}>
  //     {text}
  //   </a>
  // );
};
