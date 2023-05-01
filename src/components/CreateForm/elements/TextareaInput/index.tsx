import styles from './styles/textarea-form.module.css';

export type TextareaInputProps = {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
};

export const TextareaInput: React.FC<TextareaInputProps> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <label className={styles['label']}>
        {props.label}
        <textarea
          className={styles['input']}
          rows={5}
          name={props.name}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
      </label>
    </div>
  );
};
