import { MagnifyingGlass } from '@phosphor-icons/react';
//
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import TextInput, { TextInputProps } from 'components/elements/text-input';
import React from 'react';

const TextInputVariantEnum = {
  Default: 'default',
  WithLabel: 'WithLabel',
  WithCustomLabel: 'WithCustomLabel',
  WithError: 'WithError',
  WithRightIcon: 'WithRightIcon',
  WithLeftIcon: 'WithLeftIcon',
  WithLeftRightIcon: 'WithLeftRightIcon',
} as const;

export default function TextInputExample() {
  const options = Object.keys(TextInputVariantEnum).map(
    (key) => key,
  ) as (keyof typeof TextInputVariantEnum)[];
  const props: (value: keyof typeof TextInputVariantEnum) => TextInputProps = (
    value: keyof typeof TextInputVariantEnum,
  ) => {
    switch (value) {
      case 'WithCustomLabel':
        return {
          placeholder: 'with label',
          label: <Text textVariant="h1">With Custom Label</Text>,
        };
      case 'WithLabel':
        return {
          placeholder: 'with label',
          label: 'with label',
        };
      case 'WithError':
        return {
          placeholder: 'with error',
          label: 'with error',
          error: 'With Error',
        };
      case 'WithRightIcon':
        return {
          placeholder: 'with right icon',
          label: 'with right icon',
          rightSection: <MagnifyingGlass size={16} />,
        };
      case 'WithLeftIcon':
        return {
          placeholder: 'with left icon',
          label: 'with left icon',
          leftSection: <MagnifyingGlass size={16} />,
        };
      case 'WithLeftRightIcon':
        return {
          placeholder: 'with left right icon',
          label: 'with left right icon',
          leftSection: <MagnifyingGlass size={16} />,
          rightSection: <MagnifyingGlass size={16} />,
        };
      case 'Default':
      default:
        return {};
    }
  };

  return (
    <div>
      <Separator gap={32} />
      <Text textVariant="h1">Text Input Section</Text>
      {options.map((option) => (
        <TextInput key={option} {...props(option)} />
      ))}
    </div>
  );
}
