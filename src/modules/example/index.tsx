import { Flex } from '@mantine/core';
import React from 'react';

import AlertSection from './components/alert-section';
import ButtonExample from './components/button-example';
import CheckboxExample from './components/checkbox-example';
import ColorExample from './components/color-example';
import PinInputExample from './components/pin-input-example';
import RadioExample from './components/radio-example';
import SliderExample from './components/slider-example';
import SwitchExample from './components/switch-example';
import TextExample from './components/text-example';
import TextInputExample from './components/text-input-example';

export default function ExampleSection() {
  return (
    <Flex direction="column" gap={8} p={8}>
      <TextExample />
      <ColorExample />
      <TextInputExample />
      <SliderExample />
      <SwitchExample />
      <CheckboxExample />
      <RadioExample />
      <ButtonExample />
      <PinInputExample />
      <AlertSection />
    </Flex>
  );
}
