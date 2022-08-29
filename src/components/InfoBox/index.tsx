import { FC } from 'react';
import moment from 'moment';
import { CertData } from '../../interfaces';
import styles from './styles.module.css';

interface InfoBoxProps {
  cert: CertData;
}

const InfoBox: FC<InfoBoxProps> = ({ cert }) => {
  const { user = {}, center = {}, validFrom = '', validTo = '' } = cert;
  const { commonName: userCommonName } = user;
  const { commonName: centerCommonName } = center;

  const formattedFrom = moment(validFrom, 'YYYY-MM-DD').format('YYYY-MM-DD');
  const formattedTo = moment(validTo, 'YYYY-MM-DD').format('YYYY-MM-DD');

  const value =
    userCommonName || centerCommonName
      ? `Common Name: ${userCommonName}\nIssuer CN: ${centerCommonName}\nValid from: ${formattedFrom}\nValidTo: ${formattedTo}`
      : undefined;

  return (
    <textarea
      className={styles.textArea}
      disabled={true}
      rows={10}
      value={value}
      placeholder='Виберіть сертифікат, щоб переглянути інформацію'
    />
  );
};

export default InfoBox;
