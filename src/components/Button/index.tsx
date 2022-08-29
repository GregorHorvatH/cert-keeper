import { FC } from 'react';
import styles from './styles.module.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {label}
  </button>
);

export default Button;
