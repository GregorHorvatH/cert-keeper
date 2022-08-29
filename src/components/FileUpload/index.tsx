import { FC } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { stringToBase64 } from '../../utils/decodeCert';
import styles from './styles.module.css';

interface FileUploadProps {
  onFileLoad: (base64File: string) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileLoad }) => {
  const onFileUpload = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      onFileLoad(stringToBase64(e.target.result));
    };

    reader.readAsBinaryString(file);
  };

  return (
    <FileUploader
      classes={styles.fileUploader}
      handleChange={onFileUpload}
      label='Перетягніть файл сертифіката у поле'
    />
  );
};

export default FileUpload;
