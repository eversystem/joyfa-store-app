import { handleFile } from 'src/utils/hook';
import styles from './styles/component.module.css';

export type FileInputProps = {
  label: string;
  name: string;
  value: File | null;
  setValue: (file: File | null) => void;
};

export const FileInput: React.FC<FileInputProps> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['label']}>{props.label}</div>
      <input
        className={styles['input']}
        type="file"
        name={props.name}
        onChange={handleFile(props.setValue)}
      />
    </div>
  );
};
