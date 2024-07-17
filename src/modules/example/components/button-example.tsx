import { SimpleGrid } from '@mantine/core';
import { ArrowLeft } from '@phosphor-icons/react';
import Button, { ButtonProps, LoadingButton } from 'components/elements/button';
import Text from 'components/elements/text';
import React from 'react';

const ButtonVariantTypeEnum = {
  primary: 'primary',
  primaryDefaultLink: 'primaryDefaultLink',
  primarySmall: 'primarySmall',
  primarySmallLink: 'primarySmallLink',
  secondary: 'secondary',
  secondaryDefaultLink: 'secondaryDefaultLink',
  secondarySmall: 'secondarySmall',
  secondarySmallLink: 'secondarySmallLink',
  tertiary: 'tertiary',
  tertiaryDefaultLink: 'tertiaryDefaultLink',
  tertiarySmall: 'tertiarySmall',
  tertiarySmallLink: 'tertiarySmallLink',
  secondaryBg: 'secondaryBg',
  secondaryBgDefaultLink: 'secondaryBgDefaultLink',
  secondaryBgSmall: 'secondaryBgSmall',
  secondaryBgSmallLink: 'secondaryBgSmallLink',
  leftIcon: 'leftIcon',
  rightIcon: 'rightIcon',
  leftRightIcon: 'leftRightIcon',
} as const;

type ButtonVariantValueType = keyof typeof ButtonVariantTypeEnum;

export default function ButtonExample() {
  const options = Object.keys(ButtonVariantTypeEnum).map(
    (key) => ButtonVariantTypeEnum[key],
  ) as ButtonVariantValueType[];

  const props = React.useCallback<
    (value: ButtonVariantValueType) => ButtonProps
  >((value) => {
    switch (value) {
      case 'primaryDefaultLink':
        return {
          children: 'primaryDefaultLink',
          variant: {
            size: 'defaultLink',
            variant: 'primary',
          },
        };
      case 'primarySmall':
        return {
          children: 'primarySmall',
          variant: {
            size: 'small',
            variant: 'primary',
          },
        };
      case 'primarySmallLink':
        return {
          children: 'primarySmallLink',
          variant: {
            size: 'smallLink',
            variant: 'primary',
          },
        };
      case 'secondary':
        return {
          children: 'secondary',
          variant: {
            variant: 'secondary',
          },
        };
      case 'secondaryDefaultLink':
        return {
          children: 'secondaryDefaultLink',
          variant: {
            variant: 'secondary',
            size: 'defaultLink',
          },
        };
      case 'secondarySmall':
        return {
          children: 'secondarySmall',
          variant: {
            variant: 'secondary',
            size: 'small',
          },
        };
      case 'secondarySmallLink':
        return {
          children: 'secondarySmallLink',
          variant: {
            variant: 'secondary',
            size: 'smallLink',
          },
        };
      case 'tertiary':
        return {
          children: 'tertiary',
          variant: {
            variant: 'tertiary',
          },
        };
      case 'tertiaryDefaultLink':
        return {
          children: 'tertiaryDefaultLink',
          variant: {
            variant: 'tertiary',
            size: 'defaultLink',
          },
        };
      case 'tertiarySmall':
        return {
          children: 'tertiarySmall',
          variant: {
            variant: 'tertiary',
            size: 'small',
          },
        };
      case 'tertiarySmallLink':
        return {
          children: 'tertiarySmallLink',
          variant: {
            variant: 'tertiary',
            size: 'smallLink',
          },
        };
      case 'secondaryBg':
        return {
          children: 'secondaryBg',
          variant: {
            variant: 'secondaryBg',
          },
        };
      case 'secondaryBgDefaultLink':
        return {
          children: 'secondaryBgDefaultLink',
          variant: {
            variant: 'secondaryBg',
            size: 'defaultLink',
          },
        };
      case 'secondaryBgSmall':
        return {
          children: 'secondaryBgSmall',
          variant: {
            variant: 'secondaryBg',
            size: 'small',
          },
        };
      case 'secondaryBgSmallLink':
        return {
          children: 'secondaryBgSmallLink',
          variant: {
            variant: 'secondaryBg',
            size: 'smallLink',
          },
        };
      case 'leftIcon':
        return {
          children: 'leftIcon',
          leftSection: <ArrowLeft size={16} />,
        };
      case 'rightIcon':
        return {
          children: 'rightIcon',
          rightSection: <ArrowLeft size={16} />,
        };
      case 'leftRightIcon':
        return {
          children: 'rightIcon',
          leftSection: <ArrowLeft size={16} />,
          rightSection: <ArrowLeft size={16} />,
        };
      case 'primary':
      default:
        return {
          children: 'default',
        };
    }
  }, []);
  return (
    <>
      <Text textVariant="h1">Button Section</Text>
      <SimpleGrid cols={4}>
        {options.map((option) => (
          <Button {...props(option)} />
        ))}
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <LoadingButton isLoading>Loading</LoadingButton>
      </SimpleGrid>
    </>
  );
}
