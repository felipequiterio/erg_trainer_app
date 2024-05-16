import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../components/navigation/types';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handlePress = () => {
    console.log('HomeScreen pressed');
    navigation.navigate('Profile'); // Navigate to ProfileScreen
  };

  console.log('HomeScreen rendered');

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Home Screen! Tap to go to Profile.</Text>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 24, // Larger text size for better visibility
    color: '#fff', // White color to contrast with the blue background
  },
});

export default HomeScreen;
