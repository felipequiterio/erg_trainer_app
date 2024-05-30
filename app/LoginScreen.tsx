import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';

const LoginScreen: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchVideoUrl();
  }, []);

  const fetchVideoUrl = async () => {
    try {
      const response = await axios.get('http://localhost:3000/uploads/Test.mp4');
      if (response.status === 200) {
        setVideoUrl('http://localhost:3000/uploads/Test.mp4');
      }
    } catch (error) {
      console.error('Error fetching video URL:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : videoUrl ? (
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          controls
          resizeMode="contain"
        />
      ) : (
        <Text>Failed to load video.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  video: {
    width: 300,
    height: 300,
  },
});

export default LoginScreen;
