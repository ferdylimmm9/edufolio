import { Flex } from '@mantine/core';
import Slider from 'components/elements/slider';
import generateMarks from 'components/elements/slider/utils';
import Text from 'components/elements/text';

export default function SliderExample() {
  const { marks, step, max, min } = generateMarks([
    '1',
    '3',
    '5',
    '10',
    '20',
    '∞',
  ]);

  return (
    <Flex direction="column" gap={8}>
      <Text textVariant="h1">Slider Section</Text>
      <Slider
        labelAlwaysOn={false}
        thumbSize={24}
        size="xl"
        step={step}
        min={min}
        max={max}
        marks={marks}
      />
    </Flex>
  );
}
