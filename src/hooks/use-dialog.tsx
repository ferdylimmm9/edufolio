import { Modal, ModalProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classNames from 'classnames';
import Button, { ButtonProps } from 'components/elements/button';
import Text, { TextProps } from 'components/elements/text';
import React from 'react';
import structuralStyles, { FillType, FlexBoxType } from 'styles/layout.css';

type ChildrenProps = React.ComponentProps<'div'> & {
  flexbox?: FlexBoxType;
  fill?: FillType;
};

export type DialogType = 'custom' | 'confirmation';

export type DialogButtonClick = (props: {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  onClose: () => void;
}) => void;

export type DialogConfirmationType = {
  type: 'confirmation';
  confirmationButtonProps?: Omit<ButtonProps, 'onClick'> & {
    onClick?: DialogButtonClick;
  };
  cancelButtonProps?: Omit<ButtonProps, 'onClick'> & {
    onClick?: DialogButtonClick;
  };
  title?: React.ReactNode;
  content?: React.ReactNode;
  titleProps?: TextProps;
  contentProps?: TextProps;
  childrenProps?: ChildrenProps;
  buttonContainerProps?: ChildrenProps;
};

export type DialogCustomType = {
  type: 'custom';
  children: React.ReactElement;
};

export type UseDialogProps = (DialogConfirmationType | DialogCustomType) & {
  dialogProps?: Partial<ModalProps>;
  onClose?: () => void;
  onOpen?: () => void;
  initialState?: boolean;
};

export function DialogConfirmation(
  props: DialogConfirmationType & { onClose: () => void },
) {
  const {
    title,
    content,
    titleProps,
    cancelButtonProps,
    contentProps,
    confirmationButtonProps,
    childrenProps,
    buttonContainerProps,
    onClose,
  } = props;

  return (
    <div
      {...childrenProps}
      className={classNames(
        structuralStyles.fill({ width: true, ...childrenProps?.fill }),
        structuralStyles.flexbox({
          align: 'start',
          direction: 'column',
          gap: 'lg',
          ...childrenProps?.flexbox,
        }),
        childrenProps?.className,
      )}
    >
      {typeof title === 'string' ? (
        <Text textVariant="h3" {...titleProps}>
          {title}
        </Text>
      ) : (
        title
      )}
      {typeof content === 'string' ? (
        <Text {...contentProps}>{content}</Text>
      ) : (
        content
      )}
      <div
        {...buttonContainerProps}
        className={classNames(
          structuralStyles.flexbox({
            justify: 'between',
            ...buttonContainerProps?.flexbox,
          }),
          structuralStyles.fill({
            width: true,
            ...buttonContainerProps?.fill,
          }),
          buttonContainerProps?.className,
        )}
      >
        {cancelButtonProps && (
          <Button
            variant={{
              variant: 'tertiary',
            }}
            className={structuralStyles.fill({
              flex: true,
              width: true,
            })}
            {...cancelButtonProps}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              cancelButtonProps?.onClick?.({ event: e, onClose });
            }}
          />
        )}
        {confirmationButtonProps && (
          <Button
            className={structuralStyles.fill({
              flex: true,
              width: true,
            })}
            {...confirmationButtonProps}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              confirmationButtonProps?.onClick?.({ event: e, onClose });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function useDialog(props: UseDialogProps) {
  const { onClose, onOpen, initialState = false, dialogProps, type } = props;
  const disclosure = useDisclosure(initialState, {
    onClose,
    onOpen,
  });

  const [isOpened, { close, open, toggle }] = disclosure;

  const children = React.useMemo(() => {
    if (type === 'confirmation') {
      return <DialogConfirmation {...props} onClose={close} />;
    } else {
      const { children } = props;
      return children;
    }
  }, [close, props, type]);

  return {
    disclosure,
    open,
    close,
    toggle,
    isOpened,
    Dialog: (
      <Modal
        onClose={close}
        opened={isOpened}
        centered
        withCloseButton={false}
        padding="lg"
        radius="lg"
        closeOnClickOutside={type === 'custom'}
        {...dialogProps}
      >
        {children}
      </Modal>
    ),
  };
}
