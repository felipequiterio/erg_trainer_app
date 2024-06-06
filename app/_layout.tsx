// app/_layout.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from '@/components/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Layout = () => {
  useEffect(() => {
    const resetStorage = async () => {
      try {
        await AsyncStorage.removeItem('user');
        console.log('Storage reset');
      } catch (e) {
        console.error('Failed to reset storage', e);
      }
    };

    resetStorage();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Navigation />
    </NavigationContainer>
  );
};

export default Layout;
