import { useColorKnob } from 'retoggle';

export default () => {
  const [originPrimaryColor] = useColorKnob('主色', '#1890ff');

  console.log('originPrimaryColor', originPrimaryColor);

  return { originPrimaryColor };
};
