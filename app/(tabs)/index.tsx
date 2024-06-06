import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import Layout from '@/app/_layout';

// Ignore all non-fatal warnings
LogBox.ignoreAllLogs(true);

// Suppress console warnings and errors
console.warn = () => {};
console.error = () => {};

if (typeof document !== 'undefined') {
  const { createRoot } = require('react-dom/client');
  const container = document.getElementById('root');

  if (container) {
    const root = createRoot(container);
    root.render(<Layout />);
  }
}

export default Layout;
