import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Navigation';
import { useTheme } from '@/ThemeContext';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { isDarkTheme } = useTheme(); // Use isDarkTheme here

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Dashboard</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Workout Statistics</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Distance: 5 km</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Time: 25 mins</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Calories: 300 kcal</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Goal Tracking</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Weekly Goal: 20 km</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Completed: 15 km</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Recent Activity</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Monday: 5 km</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Wednesday: 5 km</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Friday: 5 km</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Progress Summary</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>
          {/* Add logic to display progress summary here */}
          This section will display a summary of your progress.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StartSession')}>
        <Text style={styles.buttonText}>Start Session</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  section: {
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DashboardScreen;
