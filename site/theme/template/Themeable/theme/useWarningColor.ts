import { useColorKnob } from 'retoggle';

export default () => {
  const [originWarningColor] = useColorKnob('警告色', '#faad14');

  return { originWarningColor };
};
