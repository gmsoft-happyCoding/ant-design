import { useColorKnob } from 'retoggle';

export default () => {
  const [originErrorColor] = useColorKnob('危险(错误)色', '#ff4d4f');

  return { originErrorColor };
};
