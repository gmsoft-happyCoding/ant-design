import { useSelectKnob } from 'retoggle';
import { ColorSchemeI } from '@gmsoft/tt-sdk';

export default () => {
  const [colorScheme] = useSelectKnob('配色方案', ['light', 'dark'], 'light');
  return colorScheme as ColorSchemeI;
};
