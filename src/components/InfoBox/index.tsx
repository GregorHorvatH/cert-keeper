import { FC } from 'react';
import ASN1 from '../../utils/asn1';
import styles from './styles.module.css';

const reHex = /[a-zA-Z]+\n/;

interface InfoBoxProps {
  isAddMode: boolean;
}

const InfoBox: FC<InfoBoxProps> = ({ isAddMode }) => {
  const onFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      const certData = e.target.result;
      const result = ASN1.decode(certData);

      if (result.typeName() !== 'SEQUENCE') {
        throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
      }

      console.log('--- 1 ---');
      for (let i = 0; i < result.sub[0].sub[5].sub.length; i++) {
        const item0 = result.sub[0].sub[5].sub[i].sub[0].sub[0];
        const item1 = result.sub[0].sub[5].sub[i].sub[0].sub[1];
        const code = item0.content().match(reHex)[0].replace(/\n/, '');

        console.log(`${code}: ${item1.content()}`);
      }

      // console.dir(item0);
      // console.log(item0.typeName());
      // console.log(code);

      // console.dir(item1);
      // console.log(item1.typeName());
      // console.dir(item1.content());
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
