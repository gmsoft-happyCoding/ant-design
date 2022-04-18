import React, { useState, useCallback } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Manager, Reference, Popper } from 'react-popper';
import { KnobFrame } from 'retoggle';
import { Icon } from 'antd';
import { ColorsI } from './types';
import getRGBA from './getRGBA';

interface Props {
  name: string;
  value: ColorsI;
  onChange: (color: any) => void;
}

export default function Color({ name, value, onChange }: Props) {
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [displayFontColorPicker, setDisplayFontColorPicker] = useState(false);

  const onBgChange = useCallback(
    (color: ColorResult) => {
      onChange([getRGBA(color), value[1]]);
    },
    [onChange, value],
  );

  const onFontChange = useCallback(
    (color: ColorResult) => {
      onChange([value[0], getRGBA(color)]);
    },
    [onChange, value],
  );

  return (
    <KnobFrame label={name} icon={<Icon type="highlight" />}>
      <Manager>
        <Reference>
          {({ ref }: any) => (
            <div ref={ref}>
              <div
                style={{
                  padding: '5px',
                  background: '#fff',
                  borderRadius: '1px',
                  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setDisplayBgColorPicker(!displayBgColorPicker);
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: value[0],
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: '5px',
                  padding: '5px',
                  background: '#fff',
                  borderRadius: '1px',
                  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setDisplayFontColorPicker(!displayFontColorPicker);
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: value[1],
                  }}
                />
              </div>
            </div>
          )}
        </Reference>
        {displayBgColorPicker && (
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={() => {
              setDisplayBgColorPicker(false);
            }}
          />
        )}
        {displayBgColorPicker && (
          <Popper placement="bottom">
            {({ ref, style, placement }: any) => (
              <div ref={ref} style={{ ...style, zIndex: 999 }} data-placement={placement}>
                <SketchPicker color={value[0]} onChange={onBgChange} />
              </div>
            )}
          </Popper>
        )}
        {displayFontColorPicker && (
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={() => {
              setDisplayFontColorPicker(false);
            }}
          />
        )}
        {displayFontColorPicker && (
          <Popper placement="bottom">
            {({ ref, style, placement }: any) => (
              <div ref={ref} style={{ ...style, zIndex: 999 }} data-placement={placement}>
                <SketchPicker color={value[1]} onChange={onFontChange} />
              </div>
            )}
          </Popper>
        )}
      </Manager>
    </KnobFrame>
  );
}
