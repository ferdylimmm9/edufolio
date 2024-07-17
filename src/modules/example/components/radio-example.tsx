import RadioGroup from 'components/elements/radio-group';
import Text from 'components/elements/text';

export default function RadioExample() {
  return (
    <>
      <Text textVariant="h1">Radio Section</Text>
      <RadioGroup
        data={[
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
          },
          {
            label: 'C',
            value: 'c',
          },
        ]}
      />

      <RadioGroup
        orientation="horizontal"
        label="Radio with Label"
        data={[
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
          },
          {
            label: 'C',
            value: 'c',
          },
        ]}
      />
    </>
  );
}
