import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  console.log('ProfileScreen rendered'); // Log to verify ProfileScreen component is rendered

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00f', // Distinct blue background color
  },
  text: {
    fontSize: 24,
    color: '#fff', // White color to contrast with the blue background
  },
});

export default ProfileScreen;
