import { useColorKnob } from 'retoggle';

export default () => {
  const [originInfoColor] = useColorKnob('信息色', '#1890ff');

  return { originInfoColor };
};
