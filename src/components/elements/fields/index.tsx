import ButtonField, { ButtonFieldProps } from './button';
import CheckboxField, { CheckboxFieldProps } from './checkbox';
import DatePickerInputField, {
  DatePickerInputFieldProps,
} from './date-picker-input';
import DateTimePickerField, {
  DateTimePickerFieldProps,
} from './date-time-picker';
import MultiSelectField, { MultiSelectFieldProps } from './multi-select';
import NumberInputField, { NumberInputFieldProps } from './number-input';
import PasswordInputField, { PasswordInputFieldProps } from './password-input';
import PinInputField, { PinInputFieldProps } from './pin-input';
import RadioGroupField, { RadioGroupFieldProps } from './radio-group';
import SelectField, { SelectFieldProps } from './select';
import SwitchField, { SwitchFieldProps } from './switch';
import TagsInputField, { TagsInputFieldProps } from './tags-input';
import TextInputField, { TextInputFieldProps } from './text-input';
import TextareaField, { TextareaFieldProps } from './textarea';
import TimeInputField, { TimeInputFieldProps } from './time-input';

export function Input(
  props:
    | TextInputFieldProps
    | NumberInputFieldProps
    | DatePickerInputFieldProps
    | SelectFieldProps
    | MultiSelectFieldProps
    | CheckboxFieldProps
    | TextareaFieldProps
    | DateTimePickerFieldProps
    | RadioGroupFieldProps
    | TimeInputFieldProps
    | SwitchFieldProps
    | ButtonFieldProps
    | PinInputFieldProps
    | TagsInputFieldProps
    | PasswordInputFieldProps,
) {
  switch (props.type) {
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'number':
      return <NumberInputField {...props} />;
    case 'date':
      return <DatePickerInputField {...props} />;
    case 'date-time':
      return <DateTimePickerField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'multi-select':
      return <MultiSelectField {...props} />;
    case 'textarea':
      return <TextareaField {...props} />;
    case 'radio-group':
      return <RadioGroupField {...props} />;
    case 'time':
      return <TimeInputField {...props} />;
    case 'switch':
      return <SwitchField {...props} />;
    case 'submit':
      return <ButtonField {...props} />;
    case 'pin':
      return <PinInputField {...props} />;
    case 'password':
      return <PasswordInputField {...props} />;
    case 'tags':
      return <TagsInputField {...props} />;
    default:
      return <TextInputField {...props} />;
  }
}
