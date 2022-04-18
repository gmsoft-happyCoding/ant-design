import { ColorSchemeI } from '@gmsoft/tt-sdk';
import useBgColor from './useBgColor';
import useBlackColor from './useBlackColor';
import useBorderRadius from './useBorderRadius';
import useErrorColor from './useErrorColor';
import useInfoColor from './useInfoColor';
import usePrimaryColor from './usePrimaryColor';
import useSuccessColor from './useSuccessColor';
import useTextMarkBgColor from './useTextMarkBgColor';
import useWarningColor from './useWarningColor';
import useWhiteColor from './useWhiteColor';
import useSkeletonColor from './useSkeletonColor';

export default (colorScheme: ColorSchemeI) => {
  return {
    ...usePrimaryColor(),
    ...useErrorColor(),
    ...useInfoColor(),
    ...useSuccessColor(),
    ...useTextMarkBgColor(colorScheme),
    ...useWarningColor(),
    ...useBgColor(colorScheme),
    ...useWhiteColor(),
    ...useBlackColor(),
    ...useBorderRadius(),
    ...useSkeletonColor(colorScheme),
  };
};
