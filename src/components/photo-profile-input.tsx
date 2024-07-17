import { Flex } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { ImageSquare } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import Image from 'next/image';

import { useFormState } from './elements/form/context';
import Text from './elements/text';

export function PhotoProfile(props: {
  imageUrl: FileWithPath | string;
  editable?: boolean;
}) {
  const { imageUrl, editable } = props;

  const isUrlString = typeof imageUrl === 'string';
  const url = isUrlString ? imageUrl : URL.createObjectURL(imageUrl);
  const onLoad = isUrlString ? undefined : () => URL.revokeObjectURL(url);

  return (
    <Image
      alt="test"
      width={128}
      height={128}
      src={url}
      style={{
        border: `1px solid ${colors.borderPrimary}`,
        objectFit: 'cover',
        overflow: 'hidden',
        borderRadius: 4,
        objectPosition: 'top',
        cursor: 'pointer',
        ...(editable
          ? {
              position: 'absolute',
              inset: 0,
            }
          : {}),
      }}
      onLoad={onLoad}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = '/icon512_rounded.png';
      }}
      onClick={() => {
        window.open(url);
      }}
    />
  );
}

interface PhotoProfileInputProps {
  defaultImage?: string;
  onDrop?: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  files?: FileWithPath[];
  label?: string;
}

export default function PhotoProfileInput(props: PhotoProfileInputProps) {
  const { defaultImage, files = [], onDrop, label } = props;
  const { editable } = useFormState();

  const previews = files.map((file, index) => {
    return <PhotoProfile imageUrl={file} key={index} editable={editable} />;
  });

  const defaultPreview = defaultImage ? (
    <PhotoProfile imageUrl={defaultImage} editable={editable} />
  ) : (
    <Flex direction="column" align="center">
      <ImageSquare weight="light" size={64} />
      <Text>Drop Your Image</Text>
    </Flex>
  );

  const labelComponent = label && <Text mb={4}>{label}</Text>;

  return (
    <>
      {labelComponent}
      {editable ? (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          p={0}
          onDrop={onDrop}
          multiple={false}
          w={128}
          h={128}
          style={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {files.length ? previews : defaultPreview}
        </Dropzone>
      ) : (
        defaultPreview
      )}
    </>
  );
}
