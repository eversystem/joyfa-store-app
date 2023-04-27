import styles from './styles/text-form.module.css';

export type TextInputProps = {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <label className={styles['label']}>
        {props.label}
        <input
          className={styles['input']}
          type="text"
          name={props.name}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
      </label>
    </div>
  );
};
