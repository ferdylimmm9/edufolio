import { SimpleGrid } from '@mantine/core';
import { FloppyDisk, Pencil, X } from '@phosphor-icons/react';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import { useFormState } from 'components/elements/form/context';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormActionProps {
  isEdit?: boolean;
}

export default function FormAction(props: FormActionProps) {
  const { isEdit = true } = props;
  const { editable, setIsEditable } = useFormState();

  const { formState } = useFormContext();

  const buttonEdit = isEdit && !editable && !formState.isSubmitting && (
    <Button
      rightSection={<Pencil size={16} />}
      variant={{ variant: 'secondary' }}
      onClick={() => setIsEditable(true)}
    >
      Edit
    </Button>
  );

  const buttonCreate = (editable || formState.isSubmitting) && (
    <Input
      rightSection={<FloppyDisk size={16} />}
      type="submit"
      loading={formState.isSubmitting}
      variant={{
        variant: 'primary',
      }}
    />
  );

  const buttonCancel = editable && isEdit && (
    <Button
      rightSection={<X size={16} />}
      onClick={() => setIsEditable(false)}
      error
      variant={{
        variant: 'secondaryError',
      }}
    >
      Batal
    </Button>
  );

  const items = [buttonEdit, buttonCreate, buttonCancel].filter(Boolean);

  return (
    <SimpleGrid cols={items.length}>
      {buttonEdit}
      {buttonCancel}
      {buttonCreate}
    </SimpleGrid>
  );
}
