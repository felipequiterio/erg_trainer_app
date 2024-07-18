/*
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNModal from 'react-native-modal';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [language, setLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) setLanguage(savedLanguage);
      const savedNotifications = await AsyncStorage.getItem('notifications');
      if (savedNotifications) setNotificationsEnabled(savedNotifications === 'true');
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    await AsyncStorage.setItem('language', language);
    await AsyncStorage.setItem('notifications', notificationsEnabled.toString());
    alert('Settings saved!');
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionTitle}>App Preferences</Text>
      <Text style={styles.optionText}>Language</Text>
      {Platform.OS === 'ios' ? (
        <>
          <TouchableOpacity style={styles.button} onPress={togglePicker}>
            <Text style={styles.buttonText}>{language}</Text>
          </TouchableOpacity>
          <RNModal isVisible={isPickerVisible}>
            <View style={styles.modalContainer}>
              <Picker
                selectedValue={language}
                style={styles.picker}
                onValueChange={(itemValue) => setLanguage(itemValue)}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
              </Picker>
              <TouchableOpacity style={styles.button} onPress={togglePicker}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </RNModal>
        </>
      ) : (
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
      )}

      <Text style={styles.optionText}>Notifications</Text>
      <TouchableOpacity style={styles.button} onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
        <Text style={styles.buttonText}>{notificationsEnabled ? 'Disable' : 'Enable'} Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Account</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
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
  optionText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SettingsScreen;
*/