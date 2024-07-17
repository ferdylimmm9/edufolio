import { Text, Anchor, Flex } from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

import { useFormState } from './elements/form/context';

interface FileInputProps {
  files: FileWithPath[];
  onDrop: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  label?: string;
  defaultUrls?: string[];
}

export function FileInput(props: FileInputProps) {
  const { files, onDrop, label, defaultUrls } = props;

  const previews = files.map((file) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Anchor fz={11} c="blue" href={imageUrl} key={imageUrl} target="_blank">
        {file.name}
      </Anchor>
    );
  });

  const defaultPreviews = defaultUrls?.map((file) => {
    const item = file.split('/');
    return (
      <Anchor fz={11} c="blue" href={file} key={file} target="_blank">
        {item[item.length - 1]}
      </Anchor>
    );
  });

  const labelComponent = label && <Text mb={4}>{label}</Text>;
  const { editable } = useFormState();

  return (
    <>
      {labelComponent}
      {editable && (
        <Dropzone accept={PDF_MIME_TYPE} onDrop={onDrop} mb={16}>
          <Text ta="center">Drop Files Here</Text>
        </Dropzone>
      )}
      <Flex direction="column" gap={4} w="fit-content">
        {previews.length ? previews : defaultPreviews}
      </Flex>
    </>
  );
}
