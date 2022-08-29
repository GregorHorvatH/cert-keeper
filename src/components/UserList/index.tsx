import { FC } from 'react';
import UserItem from '../UserItem';
import styles from './styles.module.css';

interface UserListProps {
  certs: string[];
  selected: number;
  onClick: (cert: string) => void;
}

const UserList: FC<UserListProps> = ({ certs, selected, onClick }) => (
  <ul className={styles.userList}>
    {certs.map((cert, idx) => (
      <UserItem
        key={cert}
        cert={cert}
        isActive={idx === selected}
        onClick={onClick}
      />
    ))}
  </ul>
);

export default UserList;
