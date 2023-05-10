import styles from './styles/textarea-form.module.css';

export type TextareaInputProps = {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
};

export const TextareaInput: React.FC<TextareaInputProps> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['label']}>{props.label}</div>
      <textarea
        disabled={!!props.disabled}
        className={styles['input']}
        rows={5}
        name={props.name}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
};
