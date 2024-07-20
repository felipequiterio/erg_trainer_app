import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { isDarkTheme } = useTheme();

  const handleLogin = () => {
    if (username === 'Admin' && password === 'admin') {
      navigation.navigate('Home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Login</Text>
      <TextInput
        style={[styles.input, { color: isDarkTheme ? '#fff' : '#000', borderColor: isDarkTheme ? '#ccc' : '#333' }]}
        placeholder="Username"
        placeholderTextColor={isDarkTheme ? '#ccc' : '#333'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { color: isDarkTheme ? '#fff' : '#000', borderColor: isDarkTheme ? '#ccc' : '#333' }]}
        placeholder="Password"
        placeholderTextColor={isDarkTheme ? '#ccc' : '#333'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color={isDarkTheme ? '#007bff' : '#007bff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
