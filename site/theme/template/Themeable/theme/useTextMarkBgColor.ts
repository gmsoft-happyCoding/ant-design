import { ColorSchemeI } from '@gmsoft/tt-sdk';
import useColorsKnob from '../useColors';

export default (colorScheme: ColorSchemeI) => {
  const [[textMarkBgColorLight, textMarkBgColorDark]] = useColorsKnob('标记背景色 light / dark', [
    '#ffe58f',
    '#ffe58f',
  ]);

  return { textMarkBgColor: colorScheme === 'light' ? textMarkBgColorLight : textMarkBgColorDark };
};
