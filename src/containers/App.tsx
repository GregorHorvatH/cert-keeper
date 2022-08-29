import { FC, useState } from 'react';
import Button from '../components/Button';
import InfoBox from '../components/InfoBox';
import UserList from '../components/UserList';
import styles from './styles.module.css';

const App: FC = () => {
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  const handleClick = () => setIsAddMode((prev) => !prev);

  return (
    <div className={styles.app}>
      <div className={styles.col}>
        <UserList />
        <Button
          label={isAddMode ? 'Скасувати' : 'Додати'}
          onClick={handleClick}
        />
      </div>
      <div className={styles.col}>
        <InfoBox isAddMode={isAddMode} />
      </div>
    </div>
  );
};

export default App;
