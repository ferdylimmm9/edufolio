import { ReactNode, useEffect, useRef } from 'react';

import { formControlStyles } from './styles.css';
import Text from '../text';

export interface CustomLabelProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CustomLabel(props: CustomLabelProps) {
  const { label, required, disabled } = props;
  return (
    <Text>
      {label}
      {required && !disabled ? (
        <span className={formControlStyles.required}> *</span>
      ) : null}
    </Text>
  );
}

export interface FormControlProps {
  label?: string;
  error?: ReactNode;
  required?: boolean;
  noMargin?: boolean;
  children: ReactNode;
  hideLabel?: boolean;
  description?: ReactNode;
}

export default function FormControl(props: FormControlProps) {
  const { label, error, required, noMargin, children, hideLabel, description } =
    props;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (error) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [error]);

  return (
    <div
      ref={ref}
      className={formControlStyles.container({ noMargin: !!noMargin })}
    >
      {!hideLabel && label && <CustomLabel {...{ label, required }} />}
      {children}
      {!!description && (
        <Text className={formControlStyles.required}>{description}</Text>
      )}
      {!!error && <Text className={formControlStyles.required}>{error}</Text>}
    </div>
  );
}
