import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Navigation';
import { useTheme } from '@/ThemeContext';

type StartSessionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartSession'>;

const StartSessionScreen = () => {
  const navigation = useNavigation<StartSessionScreenNavigationProp>();
  const { isDarkTheme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Start Erging Session</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Session Overview</Text>
        {/* Add session overview details here */}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Pre-Workout Settings</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Workout type/name</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Split</Text>
        <Text style={[styles.sectionContent, { color: isDarkTheme ? '#fff' : '#000' }]}>Target SPM</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Add advanced settings logic here */}}>
          <Text style={styles.buttonText}>Advanced Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {/* Start the session */}}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
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

export default StartSessionScreen;
