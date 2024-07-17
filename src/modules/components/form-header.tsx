import { useMediaQuery } from '@mantine/hooks';
import { Check, Pencil, Trash, X } from '@phosphor-icons/react';
import classNames from 'classnames';
import breakpoints from 'common/styles/breakpoint';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import { useFormState } from 'components/elements/form/context';
import Text from 'components/elements/text';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

interface FormHeaderProps {
  title: string;
  data?: any;
  onClickDelete?: () => void;
  rightComponent?: React.ReactNode;
}

export default function FormHeader(props: FormHeaderProps) {
  const { title, data, onClickDelete, rightComponent } = props;
  const { editable, setIsEditable } = useFormState();
  const { reset } = useFormContext();
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  const size = 'small';
  const miw = undefined;
  const textVariant = isMobile ? 'h3' : 'h1';
  return (
    <div
      className={classNames(
        structuralStyles.flexbox({
          direction: 'row',
          justify: 'between',
        }),
        structuralStyles.fill({ width: true }),
      )}
    >
      <Text textVariant={textVariant}>{title}</Text>
      <div
        className={classNames(
          structuralStyles.flexbox({
            direction: 'row',
            gap: 'md',
          }),
        )}
      >
        {rightComponent}
        {editable ? (
          <>
            <Input
              type="submit"
              variant={{
                size,
              }}
              text="Simpan"
              leftSection={<Check />}
            />
            {data && (
              <Button
                variant={{
                  size,
                  variant: 'secondaryError',
                }}
                onClick={() => {
                  reset();
                  setIsEditable(false);
                }}
                leftSection={<X />}
              >
                Batal
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              miw={miw}
              leftSection={<Pencil />}
              onClick={() => setIsEditable(true)}
              variant={{
                size,
              }}
            >
              Edit
            </Button>
            {onClickDelete && (
              <Button
                variant={{
                  size,
                  variant: 'secondaryError',
                }}
                miw={miw}
                onClick={onClickDelete}
                leftSection={<Trash />}
              >
                Hapus
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
