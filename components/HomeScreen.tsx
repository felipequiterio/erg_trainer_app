// components/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Home Screen</Text>
      <Text style={styles.subtxt}>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtxt: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default HomeScreen;
