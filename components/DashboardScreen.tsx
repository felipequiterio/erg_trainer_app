import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Navigation';

type WorkoutData = {
  id: string;
  date: string;
  duration: string;
  calories: number;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  // Sample workout data
  const workoutData: WorkoutData[] = [
    { id: '1', date: '2024-05-01', duration: '30 min', calories: 300 },
    { id: '2', date: '2024-05-02', duration: '45 min', calories: 450 },
    // Add more sample data here
  ];

  const renderItem: ListRenderItem<WorkoutData> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Date: {item.date}</Text>
      <Text style={styles.itemText}>Duration: {item.duration}</Text>
      <Text style={styles.itemText}>Calories: {item.calories}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <Text style={styles.sectionTitle}>Workout Summary</Text>
      <FlatList
        data={workoutData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <Text style={styles.sectionTitle}>Progress Tracker</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.placeholderText}>Progress graph will be here</Text>
      </View>

      <Text style={styles.sectionTitle}>AI Trainer Interaction</Text>
      <TouchableOpacity style={styles.button} onPress={() => {/* Placeholder for AI interaction logic */}}>
        <Text style={styles.buttonText}>Interact with AI Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  list: {
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DashboardScreen;
