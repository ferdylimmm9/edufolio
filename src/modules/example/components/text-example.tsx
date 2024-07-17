import { SimpleGrid } from '@mantine/core';
import typography, { TypographyVariantType } from 'common/styles/typography';
import Text from 'components/elements/text';

export default function TextExample() {
  const textVariants = Object.keys(typography).map(
    (key) => key,
  ) as TypographyVariantType[];

  return (
    <SimpleGrid cols={3}>
      {textVariants.map((textVariant) => (
        <Text textVariant={textVariant}>Text Variant: {textVariant}</Text>
      ))}
    </SimpleGrid>
  );
}
