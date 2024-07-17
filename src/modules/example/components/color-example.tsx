import { ColorSwatch, Flex, SimpleGrid } from '@mantine/core';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';

export default function ColorExample() {
  const colorVariants = Object.keys(colors).map((key) => {
    return {
      label: key,
      value: colors[key],
    };
  });

  return (
    <>
      <Text textVariant="h1">Color Section</Text>
      <SimpleGrid cols={3}>
        {colorVariants.map((variant) => (
          <Flex gap={8} align="center">
            <ColorSwatch color={variant.value} />
            <Text>{variant.label}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
}
