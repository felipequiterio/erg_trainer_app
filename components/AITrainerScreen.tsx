import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Navigation';
import { useTheme } from '../ThemeContext';

type AITrainerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AITrainer'>;

const AITrainerScreen = () => {
  const navigation = useNavigation<AITrainerScreenNavigationProp>();
  const { isDarkTheme } = useTheme();
  const [measurementSystem, setMeasurementSystem] = useState<string | null>(null);
  const [feet, setFeet] = useState<number | null>(null);
  const [inches, setInches] = useState<number | null>(null);
  const [meters, setMeters] = useState<number | null>(null);
  const [centimeters, setCentimeters] = useState<number | null>(null);
  const [UserHeight, setUserHeight] = useState<number | null>(null);
  const [exerciseType, setExerciseType] = useState<string | null>(null);
  const [ExerciseType, setExerciseTypeVariable] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [exerciseErrorModalVisible, setExerciseErrorModalVisible] = useState<boolean>(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const errorFadeAnim = useState(new Animated.Value(0))[0];
  const exerciseErrorFadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (measurementSystem === 'Imperial' && meters !== null && centimeters !== null) {
      const totalCentimeters = meters * 100 + centimeters;
      const totalInches = totalCentimeters / 2.54;
      const convertedFeet = Math.floor(totalInches / 12);
      const convertedInches = Math.round(totalInches % 12);
      setFeet(convertedFeet);
      setInches(convertedInches);
    } else if (measurementSystem === 'Metric' && feet !== null && inches !== null) {
      const totalInches = feet * 12 + inches;
      const totalCentimeters = totalInches * 2.54;
      const convertedMeters = Math.floor(totalCentimeters / 100);
      const convertedCentimeters = Math.round(totalCentimeters % 100);
      setMeters(convertedMeters);
      setCentimeters(convertedCentimeters);
    }
  }, [measurementSystem]);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible, fadeAnim]);

  useEffect(() => {
    if (errorModalVisible) {
      Animated.timing(errorFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      errorFadeAnim.setValue(0);
    }
  }, [errorModalVisible, errorFadeAnim]);

  useEffect(() => {
    if (exerciseErrorModalVisible) {
      Animated.timing(exerciseErrorFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      exerciseErrorFadeAnim.setValue(0);
    }
  }, [exerciseErrorModalVisible, exerciseErrorFadeAnim]);

  const renderPickerItems = (start: number, end: number) => {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push({ label: `${i}`, value: i });
    }
    return items;
  };

  const handleAcceptEntries = () => {
    if (measurementSystem === null) {
      setErrorModalVisible(true);
      return;
    }

    if (
      (measurementSystem === 'Imperial' && (feet === null || inches === null)) ||
      (measurementSystem === 'Metric' && (meters === null || centimeters === null))
    ) {
      setErrorModalVisible(true);
      return;
    }

    if (exerciseType === null) {
      setExerciseErrorModalVisible(true);
      return;
    }

    let heightInCentimeters = 0;
    if (measurementSystem === 'Imperial' && feet !== null && inches !== null) {
      heightInCentimeters = Math.round((feet * 30.48) + (inches * 2.54));
    } else if (measurementSystem === 'Metric' && meters !== null && centimeters !== null) {
      heightInCentimeters = Math.round((meters * 100) + centimeters);
    }

    //Variable for Felipe Code
    setUserHeight(heightInCentimeters);
    console.log('UserHeight in centimeters:', heightInCentimeters);

    const exerciseTypeMapping: { [key: string]: string } = {
      'Split Training': 'SplitTraining',
      'Target SPM (Strokes Per Minute)': 'TargetSPM',
      'Interval Training': 'IntervalTraining',
      'Pyramid Training': 'PyramidTraining',
      'Distance Training': 'DistanceTraining',
      'Time Trial': 'TimeTrial',
    };
    
    //Variable for Felipe Code
    setExerciseTypeVariable(exerciseTypeMapping[exerciseType]);
    console.log('ExerciseType:', exerciseTypeMapping[exerciseType]);

    // Navigate to the next screen
    navigation.navigate('Training');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Erg Trainer</Text>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Measurement System</Text>
          <RNPickerSelect
            onValueChange={(value) => setMeasurementSystem(value)}
            items={[
              { label: 'Imperial', value: 'Imperial' },
              { label: 'Metric', value: 'Metric' },
            ]}
            style={pickerSelectStyles}
            value={measurementSystem}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Select a measurement system', value: null }}
          />
          </View>
          {measurementSystem === 'Imperial' && (
          <View style={styles.pickerContainer}>
            <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Height (Feet and Inches)</Text>
            <View style={styles.inlinePickerContainer}>
                <View style={styles.pickerWrapper}>
                <RNPickerSelect
                    onValueChange={(value) => setFeet(value)}
                    items={renderPickerItems(0, 10)}
                    style={pickerSelectStyles}
                    value={feet}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: 'Select feet', value: null }}
                    />
                </View>
                <View style={styles.pickerWrapper}>
                    <RNPickerSelect
                    onValueChange={(value) => setInches(value)}
                    items={renderPickerItems(0, 11)}
                    style={pickerSelectStyles}
                    value={inches}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: 'Select inches', value: null }}
                    />
                    </View>
                </View>
            </View>
          )}
          
          {measurementSystem === 'Metric' && (
          <View style={styles.pickerContainer}>
          <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Height (Meters and Centimeters)</Text>
          <View style={styles.inlinePickerContainer}>
            <View style={styles.pickerWrapper}>
              <RNPickerSelect
                  onValueChange={(value) => setMeters(value)}
                  items={renderPickerItems(0, 3)}
                  style={pickerSelectStyles}
                  value={meters}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: 'Select meters', value: null }}
                />
              </View>
              <View style={styles.pickerWrapper}>
                <RNPickerSelect
                  onValueChange={(value) => setCentimeters(value)}
                  items={renderPickerItems(0, 100)}
                  style={pickerSelectStyles}
                  value={centimeters}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: 'Select centimeters', value: null }}
                />
                </View>
              </View>
            </View>
          )}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Exercise Type</Text>
          <RNPickerSelect
            onValueChange={(value) => setExerciseType(value)}
            items={[
                    { label: 'Split Training', value: 'Split Training' },
                    { label: 'Target SPM (Strokes Per Minute)', value: 'Target SPM (Strokes Per Minute)' },
                    { label: 'Interval Training', value: 'Interval Training' },
                    { label: 'Pyramid Training', value: 'Pyramid Training' },
                    { label: 'Distance Training', value: 'Distance Training' },
                    { label: 'Time Trial', value: 'Time Trial' },
                ]}
            style={pickerSelectStyles}
            value={exerciseType}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Select an exercise type', value: null }}
          />
        </View>
        </View>
        

        <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptEntries}>
          <Text style={styles.buttonText}>Accept Entries</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Back To Dashboard</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={() => setModalVisible(false)}
        >
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to go back?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Dashboard');
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>

        <Modal
          transparent={true}
          visible={errorModalVisible}
          animationType="none"
          onRequestClose={() => setErrorModalVisible(false)}
        >
          <Animated.View style={[styles.modalContainer, { opacity: errorFadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Please enter your height</Text>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>

        <Modal
          transparent={true}
          visible={exerciseErrorModalVisible}
          animationType="none"
          onRequestClose={() => setExerciseErrorModalVisible(false)}
        >
          <Animated.View style={[styles.modalContainer, { opacity: exerciseErrorFadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Please choose an exercise type</Text>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setExerciseErrorModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    pickerContainer: {
      width: '100%',
      marginBottom: 16,
    },
    inlinePickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pickerWrapper: {
      flex: 1,
      marginRight: 10,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
    },
    acceptButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
      },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButtonYes: {
      backgroundColor: '#007bff',
    },
    modalButtonNo: {
      backgroundColor: '#ff4444',
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  
  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white',
      marginBottom: 20,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white',
      marginBottom: 20,
    },
    placeholder: {
      color: 'gray',
    },
  };
  
  export default AITrainerScreen;
  
