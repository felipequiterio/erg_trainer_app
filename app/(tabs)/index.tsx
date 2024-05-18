// index.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import Navigation from '@/components/Navigation';

const App = () => {
  return <Navigation />;
};

registerRootComponent(App);

export default App;
