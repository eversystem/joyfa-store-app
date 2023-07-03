import { handleFile } from 'src/utils/hook';
import styles from './styles/component.module.css';

export type FileInputProps = {
  label: string;
  name: string;
  value: File | null;
  setValue: (file: File | null) => void;
  disabled?: boolean;
  accept?: string;
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
            accept={props.accept}
            name={props.name}
            onChange={handleFile(props.setValue)}
          />
          <svg
            width="140pt"
            height="70pt"
            version="1.1"
            viewBox="0 0 1200 1200"
            xmlns="http://www.w3.org/2000/svg"
            transform="scale(0.3)"
          >
            <g fill="#605d67">
              <path d="m508.2 764.16h183.72c36.121 0 65.641-29.398 65.641-65.641v-224.4h61.078c11.398 0 21.602-6.3594 26.762-16.441 5.1602-10.199 4.0781-22.199-2.7617-31.32l-207.84-278.88c-8.2812-11.039-20.879-17.398-34.68-17.398-13.801 0-26.398 6.3594-34.68 17.398l-207.84 278.88c-6.8398 9.1211-7.8008 21.121-2.7617 31.32 5.0391 10.199 15.359 16.441 26.762 16.441h61.078v224.4c0 36.121 29.398 65.641 65.641 65.641z" />
              <path d="m210 1069.9h780c49.68 0 90-40.32 90-90v-245.76c0-36.359-29.641-66-66-66h-119.76c-27.238 0-52.078 17.16-61.68 42.602l-30.84 81.602c-7.9219 20.879-28.199 34.922-50.52 34.922h-302.4c-22.32 0-42.602-14.039-50.52-34.922l-30.719-81.48c-9.6016-25.559-34.441-42.719-61.801-42.719h-119.76c-36.359 0-66 29.641-66 66v245.76c0 49.68 40.32 90 90 90z" />
            </g>
          </svg>
        </label>
        <div className={styles['filename']}>
          {props.value
            ? props.value.name.length < 21
              ? props.value.name
              : `${props.value.name.slice(0, 20)}...`
            : ''}
        </div>
      </div>
    </div>
  );
};
