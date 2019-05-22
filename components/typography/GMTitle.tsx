import * as React from 'react';
import Title, { TitleProps } from './Title';
import Divider from '../divider';
import { Omit } from '../_util/type';

type SizeProps = { size?: 'small' | 'default' | 'large' };

type ExtendProps = {
  divider?: boolean;
  marginTop?: number;
  marginBottom?: number;
};

type GMTitleProps = Omit<TitleProps, 'level'> & ExtendProps;

type TitleDividerProps = Omit<ExtendProps, 'marginTop'>;

// title分割线
const TitleDivider = ({ divider, marginBottom }: TitleDividerProps) => {
  return divider ? <Divider type="horizontal" style={{ marginTop: 0, marginBottom }} /> : null;
};

TitleDivider.defaultProps = {
  divider: false,
};

const GMTitleDefault = (props: GMTitleProps) => {
  const { divider, marginTop, marginBottom, ...restProps } = props;
  const fontStyle = { fontWeight: 500 };

  return (
    <>
      <Title
        {...restProps}
        level={4}
        style={{ marginTop, marginBottom: divider ? 8 : marginBottom, ...fontStyle }}
      />
      <TitleDivider divider={divider} marginBottom={marginBottom} />
    </>
  );
};

GMTitleDefault.defaultProps = {
  divider: true,
  marginTop: 0,
  marginBottom: 16,
};

const GMTitleLarge = (props: GMTitleProps) => {
  const { divider, marginTop, marginBottom, ...restProps } = props;

  return (
    <>
      <Title
        {...restProps}
        level={3}
        style={{ marginTop, marginBottom: divider ? 8 : marginBottom }}
      />
      <TitleDivider divider={divider} marginBottom={marginBottom} />
    </>
  );
};

GMTitleLarge.defaultProps = {
  divider: false,
  marginTop: 0,
  marginBottom: 24,
};

const GMTitleSmall = (props: GMTitleProps) => {
  const { divider, marginTop, marginBottom, ...restProps } = props;
  const fontStyle = { fontSize: 16, color: 'rgba(0,0,0,0.45)', fontWeight: 500 };

  return (
    <>
      <Title
        {...restProps}
        style={{ marginTop, marginBottom: divider ? 8 : marginBottom, ...fontStyle }}
      />
      <TitleDivider divider={divider} marginBottom={marginBottom} />
    </>
  );
};

GMTitleSmall.defaultProps = {
  divider: false,
  marginTop: 0,
  marginBottom: 8,
};

const GMTitle = (props: GMTitleProps & SizeProps) => {
  const { size, ...restProps } = props;

  switch (props.size) {
    case 'small':
      return <GMTitleSmall {...restProps} />;
    case 'large':
      return <GMTitleLarge {...restProps} />;
    default:
      return <GMTitleDefault {...restProps} />;
  }
};

export default GMTitle;
