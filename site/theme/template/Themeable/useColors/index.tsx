import { useState, useEffect } from 'react';
import { useInspector } from 'retoggle';
import Component from './colors';
import { ColorsI } from './types';

export default function useColorsKnob(name: string, [initialBgValue, initialFontValue]: ColorsI) {
  const [value, setValue] = useState([initialBgValue, initialFontValue]);
  const inspector = useInspector();
  inspector.addKnobRenderer('colors', Component);
  useEffect(() => {
    inspector.setKnob({
      name,
      type: 'colors',
      value,
      onChange: (value: ColorsI) => {
        setValue(value);
      },
    });
  }, [value]);

  useEffect(() => {
    return () => inspector.removeKnob(name);
  }, []);
  return [value, setValue] as const;
}
