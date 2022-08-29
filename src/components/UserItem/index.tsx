import { FC, memo } from 'react';
import decodeCert, { base64ToString } from '../../utils/decodeCert';
import { CertData } from '../../interfaces';
import { GoTriangleRight } from 'react-icons/go';
import styles from './styles.module.css';

interface UserItemProps {
  cert: string;
  isActive: boolean;
  onClick: (cert: string) => void;
}

const UserItem: FC<UserItemProps> = ({ cert, isActive, onClick }) => {
  const { user } = decodeCert(base64ToString(cert)) as CertData;

  return (
    <li
      className={[styles.userItem, isActive ? styles.active : ''].join(' ')}
      onClick={() => onClick(cert)}
    >
      <span>{user?.commonName || ''}</span>
      {isActive && <GoTriangleRight size={20} />}
    </li>
  );
};

export default memo(UserItem);
