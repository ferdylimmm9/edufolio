import invariant from 'invariant';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface FormStateProps {
  editable: boolean;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}

export const FormContext = createContext<FormStateProps>({
  editable: false,
  setIsEditable: () => {},
});

interface Props {
  children: (context: FormStateProps) => any;
}

export function FormState(props: Props) {
  const context = useContext(FormContext);
  return props.children(context);
}

export function useFormState(): FormStateProps {
  const context = useContext(FormContext);
  invariant(
    context !== undefined,
    'useFormState must be used inside Form Container',
  );
  return context;
}
