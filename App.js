import React from 'react';
import Main123 from './src/view/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaProvider>
      <Main123></Main123>
    </SafeAreaProvider>

  );
}

