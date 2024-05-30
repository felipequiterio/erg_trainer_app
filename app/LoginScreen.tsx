import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen: React.FC = () => {
  const [apiData, setApiData] = useState<string | null>(null);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/hello'); // Adjust the URL as needed
      console.log('API response:', response.data); // Log the response
      setApiData(response.data.message);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      {apiData ? (
        <Text style={styles.apiData}>{apiData}</Text>
      ) : (
        <Text style={styles.apiData}>No data fetched yet</Text>
      )}
      <Button title="Fetch API Data" onPress={fetchDataFromAPI} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  apiData: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default LoginScreen;
