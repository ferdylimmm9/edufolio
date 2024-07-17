import { SliderProps } from 'components/elements/slider';
import React from 'react';

export default function generateMarks(data: React.ReactNode[]) {
  const step: SliderProps['step'] = 1;
  const marks: SliderProps['marks'] = data.map((label, index) => {
    return {
      value: index,
      label,
    };
  });

  return {
    step,
    marks,
    min: 0,
    max: data.length - 1,
  };
}
