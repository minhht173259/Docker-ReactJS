import React from 'react';
import GlobalStyles from './globalStyles';
import LighModeProvider from './context/light';
import Portfolio from './components/Portfolio';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <LighModeProvider>
        <Portfolio />
      </LighModeProvider>
    </>
  );
}
