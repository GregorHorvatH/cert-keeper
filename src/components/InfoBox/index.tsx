import { FC } from 'react';
import ASN1 from '../../utils/asn1';
import styles from './styles.module.css';

interface InfoBoxProps {
  isAddMode: boolean;
}

const InfoBox: FC<InfoBoxProps> = ({ isAddMode }) => {
  const onFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const certData = e.target.result;

      const result = ASN1.decode(certData);
      if (result.typeName() !== 'SEQUENCE') {
        throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
      }
      const tbsCertificate = result;

      console.log(certData);
      console.log(tbsCertificate);
    };

    reader.readAsBinaryString(file);
  };

  return isAddMode ? (
    <input type='file' onInput={onFileUpload} />
  ) : (
    <textarea
      className={styles.textArea}
      rows={10}
      placeholder='Виберіть сертифікат, щоб переглянути інформацію'
    />
  );
};

export default InfoBox;
