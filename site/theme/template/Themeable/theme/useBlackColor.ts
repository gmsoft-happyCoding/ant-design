import { useColorKnob } from 'retoggle';

export default () => {
  const [black] = useColorKnob('主要用于文本(深色)', '#000000');

  return { black };
};
