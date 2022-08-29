import { FC, useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import InfoBox from '../components/InfoBox';
import UserList from '../components/UserList';
import FileUpload from '../components/FileUpload';
import { loadCerts, saveCerts } from '../api/certsApi';
import styles from './styles.module.css';
import { CertData } from '../interfaces';
import decodeCert, { base64ToString } from '../utils/decodeCert';

const App: FC = () => {
  const [certs, setCerts] = useState<string[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertData>({});
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  const toggleMode = useCallback(() => setIsAddMode((prev) => !prev), []);

  const handleFileLoad = useCallback(
    (base64File: string) => {
      saveCerts(base64File).then((cert) => {
        setCerts((prev) => [...prev, cert]);
        toggleMode();
      });
    },
    [toggleMode]
  );

  const handleUserClick = useCallback(
    (cert: string) => {
      setIsAddMode(false);
      setSelectedIdx(certs.indexOf(cert));
      setSelectedCert(decodeCert(base64ToString(cert)));
    },
    [certs]
  );

  useEffect(() => {
    loadCerts().then(setCerts);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.col}>
        <UserList
          certs={certs}
          selected={selectedIdx}
          onClick={handleUserClick}
        />
        <Button
          label={isAddMode ? 'Скасувати' : 'Додати'}
          onClick={toggleMode}
        />
      </div>
      <div className={styles.col}>
        {isAddMode ? (
          <FileUpload onFileLoad={handleFileLoad} />
        ) : (
          <InfoBox cert={selectedCert} />
        )}
      </div>
    </div>
  );
};

export default App;
