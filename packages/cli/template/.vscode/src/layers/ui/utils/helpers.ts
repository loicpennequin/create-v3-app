import { OpenPropsColor } from './types';

export const isOpenPropsColor = (color: string): color is OpenPropsColor =>
  [
    'gray',
    'stone',
    'red',
    'pink',
    'purple',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
    'choco',
    'brown',
    'sand',
    'camo',
    'jungle'
  ].includes(color);
