import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView, Modal, Dimensions, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Video, ResizeMode } from 'expo-av';
import { RootStackParamList } from './Navigation';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../ThemeContext';

type TrainingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AITrainer'>;

const TrainingScreen = () => {
  const navigation = useNavigation<TrainingScreenNavigationProp>();
  const { isDarkTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isTraining, setIsTraining] = useState(false);
  const [showHighlightsButton, setShowHighlightsButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSource, setVideoSource] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState<boolean>(false);
  const [recording, setRecording] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('Recording state changed:', recording);
  }, [recording]);

  useEffect(() => {
    console.log('Media Perm:', mediaLibraryPermission);
  }, [mediaLibraryPermission]);

  useEffect(() => {
    console.log('Perm:', permission);
  }, [permission]);

  useEffect(() => {
    console.log('Perm:', permission);
  }, [permission]);

  async function requestMediaLibraryPermission() {
    if (permission && !mediaLibraryPermission) {
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    }
  }
  const handleStartStopTraining = async () => {
    if (!cameraOpen) {
      setCameraOpen(true);
      setShowVideo(false); // Hide video when camera is reopened
      setShowHighlightsButton(false); // Hide Highlights button when camera is open
    } else if (isTraining) {
      setShowHighlightsButton(true);
      setShowVideo(false);
      setIsTraining(false);
      console.log('isTraining1', recording);
      if (recording) {
        cameraRef.current.stopRecording();
        console.log('isTraining2', recording);
        setRecording(false);
      }
      setCameraOpen(false);
      videoImage(); // Open the image picker when stopping training
      return;
    } else {
      setIsTraining(true); // true
      console.log('isTraining3', recording);
      setShowVideo(false); // Ensure video is hidden when starting training
      setShowHighlightsButton(false);
  
      if (cameraRef.current) {
        console.log('isTraining4', recording);
        try {
          setRecording(true); // true
          await new Promise(resolve => setTimeout(resolve, 0)); // Ensure state updates
  
          console.log('isTraining5', recording); // This should now log true
  
          try {
            const video = await cameraRef.current.recordAsync();
            console.log('Video object:', video); // Log the video object
  
            if (video && video.uri) {
              console.log('Video URI exists');
              const videoUri = video.uri;
              console.log('Video URI:', videoUri);
  
              try {
                const asset = await MediaLibrary.createAssetAsync(videoUri);
                console.log('Asset created:', asset); // Log the asset object
  
                const album = await MediaLibrary.createAlbumAsync('Videos', asset, false);
                console.log('Album updated with new video:', album); // Log album creation/update
  
                Alert.alert('Video saved', `Your video has been saved to your camera roll.`);
              } catch (saveError) {
                console.error('Error during saving to media library:', saveError);
              }
            } else {
              console.error('Video recording failed or URI is not available');
            }
          } catch (recordError) {
            console.error('Error during recording:', recordError);
          }
        } catch (stateError) {
          console.error('Error during state update:', stateError);
        } finally {
          setRecording(false);
        }
      } else {
        console.error('cameraRef.current is not available');
      }
    }
  };
  
  // Permissions check (example for React Native)
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      console.log('Camera Perm:', cameraStatus);
      if (cameraStatus.status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
  
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      console.log('Media Perm:', mediaLibraryStatus);
      if (mediaLibraryStatus.status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
      }
    })();
  }, []);
  
  
  
  
  
  
  // const handleStartStopTraining = async () => {
  //   if (!cameraOpen) {
  //     setCameraOpen(true);
  //     setShowVideo(false); // Hide video when camera is reopened
  //     setShowHighlightsButton(false); // Hide Highlights button when camera is open
  //   } else if (isTraining) {
  //     setShowHighlightsButton(true);
  //     setShowVideo(false);
  //     setIsTraining(false);
  //     console.log('isTraining1', recording);
  //     if (recording) {
  //       cameraRef.current.stopRecording();
  //       console.log('isTraining2', recording);
  //       setRecording(false);
  //     }
  //     setCameraOpen(false);
  //     videoImage(); // Open the image picker when stopping training
  //     return;
  //   } else {
  //     setIsTraining(true); //true
  //     console.log('isTraining3', recording);
  //     setShowVideo(false); // Ensure video is hidden when starting training
  //     setShowHighlightsButton(false);
      
  //     if (cameraRef.current) {
  //       console.log('isTraining4', recording);
  //       try {
  //         setRecording(true); //true
  //         console.log('isTraining5', recording); // false (if state hasn't updated yet)
  //         await new Promise(resolve => setTimeout(resolve, 0)); // Ensure state updates
  //         console.log('isTraining5 (updated)', recording); // should be true now
  //         const video = await cameraRef.current.recordAsync();
  //         const videoUri = video.uri;
  //         const asset = await MediaLibrary.createAssetAsync(videoUri);
  //         await MediaLibrary.createAlbumAsync('Videos', asset, false);

  //         Alert.alert('Video saved', `Your video has been saved to your camera roll.`);
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         setRecording(false);
  //       }
  //     }
  //   }
  // };

  const handleReturnToDashboard = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleConfirmReturn = () => {
    setModalVisible(false);
    navigation.navigate('Dashboard');
  };

  const { width, height } = Dimensions.get('window');
  const buttonHeight = 50;
  const buttonMargin = 10;
  const numButtons = 3;
  const totalButtonHeight = (buttonHeight + buttonMargin * 2) * numButtons;
  const availableHeight = height - totalButtonHeight - 50;
  const videoWidth = width * 0.9;
  const videoHeight = videoWidth * (9 / 16);
  const finalVideoHeight = Math.min(videoHeight, availableHeight);
  const finalVideoWidth = finalVideoHeight * (16 / 9);
  const fadeAnim = useState(new Animated.Value(0))[0];

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

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>We need your permission to show camera</Text>
            <Button title='Grant Camera permission' onPress={requestPermission} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted || !mediaLibraryPermission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>We need your permission to access media library</Text>
            <Button onPress={requestMediaLibraryPermission} title="Grant Media Library Permission" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const videoImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    
    console.log(result);
    if (!result.canceled) {
      setVideoSource(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>AI Trainer</Text>
        <View style={styles.videoViewer}>
          {showVideo && !isTraining && (
            <View style={styles.videoContainer}>
              <Video
                ref={videoRef}
                source={{ uri: videoSource }}
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                useNativeControls
              />
            </View>
          )}
  
          {cameraOpen && (
            <View style={styles.cameraContainer}>
              <CameraView style={styles.camera} facing={facing} ref={cameraRef} mode='video'>
                {!isTraining && (
                  <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.buttonText}>Flip Camera</Text>
                  </TouchableOpacity>
                )}
              </CameraView>
            </View>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          {showHighlightsButton && (
            <TouchableOpacity style={styles.button} onPress={() => setShowVideo(true)}>
              <Text style={styles.buttonText}>Watch Highlights</Text>
            </TouchableOpacity>
          )}
  
          <TouchableOpacity style={styles.button} onPress={handleStartStopTraining}>
            <Text style={styles.buttonText}>
              {cameraOpen
                ? isTraining
                  ? 'Stop Training'
                  : 'Start Training'
                : 'Open Camera'}
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={handleReturnToDashboard}>
            <Text style={styles.buttonText}>Back To Dashboard</Text>
          </TouchableOpacity>
        </View>
  
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
                  onPress={handleConfirmReturn}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>
      </View>
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
  videoViewer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  videoContainer: {
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: 'white',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    width: '100%',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure it takes the full width
  },
  camera: {
    flex: 1,
    width: '100%', // Ensure it takes the full width
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TrainingScreen;
