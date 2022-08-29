import { FC } from 'react';
import { stringToBase64 } from '../../utils/decodeCert';
// import styles from './styles.module.css';

interface FileUploadProps {
  onFileLoad: (base64File: string) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileLoad }) => {
  const onFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      onFileLoad(stringToBase64(e.target.result));
    };

    reader.readAsBinaryString(file);
  };

  return <input type='file' onInput={onFileUpload} />;
};

export default FileUpload;
