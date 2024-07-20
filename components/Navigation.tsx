// components/Navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
//import ProfileScreen from './ProfileScreen';
import DashboardScreen from './DashboardScreen';
//import SettingsScreen from './SettingsScreen';
import AITrainerScreen from './AITrainerScreen';
import TrainingScreen from './TrainingScreen';


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Dashboard: undefined;
  Settings: undefined;
  AITrainer: undefined;
  Training: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AITrainer" component={AITrainerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Training" component={TrainingScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Navigation;
