import { ColorSchemeI } from '@gmsoft/tt-sdk';
import useColorsKnob from '../useColors';

export default (colorScheme: ColorSchemeI) => {
  const [[skeletonColorLight, skeletonColorDark]] = useColorsKnob('骨架屏 light / dark', [
    'rgba(190, 190, 190, 0.2)',
    'rgba(190, 190, 190, 0.2)',
  ]);

  return { skeletonColor: colorScheme === 'light' ? skeletonColorLight : skeletonColorDark };
};
