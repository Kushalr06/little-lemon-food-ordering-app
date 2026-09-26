import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoading, isOnboarded } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>Loading Little Lemon...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboarded ? 'Home' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 220,
    height: 60,
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 12,
  },
  loadingText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
});
