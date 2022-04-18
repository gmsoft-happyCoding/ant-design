import { ColorResult } from 'react-color';

export default function getRGBA({ rgb }: ColorResult) {
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
}
