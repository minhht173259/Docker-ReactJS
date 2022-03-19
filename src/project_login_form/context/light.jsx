import React, { createContext, useMemo, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '../config/themes';

const LightModeContext = createContext({});

export function useModeLight() {
  return React.useContext(LightModeContext);
}

export default function LighModeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const changeLightMode = useCallback(() => {
    if (mode === 'light') {
      setMode('dark');
    }

    if (mode === 'dark') {
      setMode('light');
    }
  }, [mode]);

  const vlaues = useMemo(
    () => ({
      mode,
      changeLightMode
    }),
    [mode]
  );

  return (
    <LightModeContext.Provider value={vlaues}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </LightModeContext.Provider>
  );
}
