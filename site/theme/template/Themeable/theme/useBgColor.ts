import useColorsKnob from '../useColors';

import { ColorSchemeI } from '@gmsoft/tt-sdk';

const DEFAULT_LIGHT_BG = '#ffffff';
const DEFAULT_DARK_BG = '#282C35';

export default (colorScheme: ColorSchemeI) => {
  const [[pageBgColorLight, pageBgColorDark]] = useColorsKnob('页面背景色 light / dark', [
    DEFAULT_LIGHT_BG,
    DEFAULT_DARK_BG,
  ]);

  return { pageBgColor: colorScheme === 'light' ? pageBgColorLight : pageBgColorDark };
};
