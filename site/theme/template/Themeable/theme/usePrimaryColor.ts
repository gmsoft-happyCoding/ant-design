import { useColorKnob } from 'retoggle';

export default () => {
  const [originPrimaryColor] = useColorKnob('主色', '#1890ff');

  return { originPrimaryColor };
};
