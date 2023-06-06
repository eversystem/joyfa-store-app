import styles from './styles/text-form.module.css';

export type TextInputProps = {
  label: string;
  name: string;
  value: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  setValue: (value: string) => void;
  suffix?: string;
  disabled?: boolean;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['label']}>{props.label}</div>
      <div className={styles['input-wrapper']}>
        <input
          disabled={!!props.disabled}
          className={styles['input']}
          type={props.type || 'text'}
          name={props.name}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {!!props.suffix ? (
          <div className={styles['input-suffix']}>{props.suffix}</div>
        ) : null}
      </div>
    </div>
  );
};
