import { useColorKnob } from 'retoggle';

export default () => {
  const [white] = useColorKnob('主要用于文本(浅色)', '#ffffff');

  return { white };
};
