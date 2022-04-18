import { useTextKnob } from 'retoggle';

export default () => {
  const [borderRadius] = useTextKnob('圆角半径', '2px');

  return {
    borderRadius,
  };
};
