import { useColorKnob } from 'retoggle';

export default () => {
  const [originSuccessColor] = useColorKnob('成功色', '#52c41a');

  return { originSuccessColor };
};
