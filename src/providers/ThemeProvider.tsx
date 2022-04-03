import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function MaterialThemeProvider(props: ThemeProviderProps) {

  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}