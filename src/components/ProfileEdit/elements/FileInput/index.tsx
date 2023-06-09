import { handleFile } from 'src/utils/hook';
import styles from './styles/component.module.css';

export type FileInputProps = {
  label: string;
  name: string;
  value: File | null;
  setValue: (file: File | null) => void;
  disabled?: boolean;
};

export const FileInput: React.FC<FileInputProps> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['label']}>{props.label}</div>
      <div className={styles['uploader']}>
        <label className={styles['upload-file']}>
          <input
            type="file"
            disabled={!!props.disabled}
            className={styles['input']}
            name={props.name}
            onChange={handleFile(props.setValue)}
          />
          Upload File
        </label>
        <div className={styles['filename']}>
          {props.value
            ? props.value.name.length < 21
              ? props.value.name
              : `${props.value.name.slice(0, 20)}...`
            : 'File Not Selected'}
        </div>
      </div>
    </div>
  );
};
