import React, { useMemo } from 'react';
import { Inspector as RetoggleInspector } from 'retoggle';
import useTheme from './theme';
import { Themeable } from '@gmsoft/tt-sdk';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import useColorScheme from './useColorScheme';
import './themeInspector.less';

const store = createStore((state: any = {}) => state);

interface Props {
  children: React.ReactChild;
}

export default ({ children }: Props) => {
  const colorScheme = useColorScheme();

  const theme = useTheme(colorScheme);

  const extraTheme = useMemo(
    () => ({
      base: theme,
    }),
    [theme],
  );

  return (
    <Provider store={store}>
      <Themeable colorScheme={colorScheme} djcGatewayBaseUrl="" extraTheme={extraTheme}>
        {children}
      </Themeable>
    </Provider>
  );
};

export const Inspector = () => {
  return (
    <div id="theme-inspector">
      <RetoggleInspector usePortal={false} />
    </div>
  );
};
