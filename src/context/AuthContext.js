import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getUserProfile,
  saveUserProfile,
  isOnboardingCompleted,
  setOnboardingCompleted,
  clearAllData,
  DEFAULT_PROFILE,
} from '../storage/storage';

const AuthContext = createContext({
  isLoading: true,
  isOnboarded: false,
  userProfile: DEFAULT_PROFILE,
  completeOnboarding: async () => {},
  updateProfile: async () => {},
  logout: async () => {},
  reloadProfile: async () => {},
});

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userProfile, setUserProfile] = useState(DEFAULT_PROFILE);

  // Load initial onboarding and profile state on app launch
  useEffect(() => {
    async function loadInitialState() {
      try {
        const onboarded = await isOnboardingCompleted();
        if (onboarded) {
          const profile = await getUserProfile();
          setUserProfile(profile);
          setIsOnboarded(true);
        } else {
          setIsOnboarded(false);
          setUserProfile(DEFAULT_PROFILE);
        }
      } catch (e) {
        console.error('Failed to load initial auth state:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialState();
  }, []);

  const completeOnboarding = async ({ firstName, lastName, email }) => {
    const newProfile = {
      ...DEFAULT_PROFILE,
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email: email.trim().toLowerCase(),
    };
    await saveUserProfile(newProfile);
    await setOnboardingCompleted(true);
    setUserProfile(newProfile);
    setIsOnboarded(true);
  };

  const updateProfile = async (updatedFields) => {
    const newProfile = {
      ...userProfile,
      ...updatedFields,
      notifications: {
        ...userProfile.notifications,
        ...(updatedFields.notifications || {}),
      },
    };
    const success = await saveUserProfile(newProfile);
    if (success) {
      setUserProfile(newProfile);
    }
    return success;
  };

  const reloadProfile = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
    return profile;
  };

  const logout = async () => {
    await clearAllData();
    setUserProfile(DEFAULT_PROFILE);
    setIsOnboarded(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isOnboarded,
        userProfile,
        completeOnboarding,
        updateProfile,
        logout,
        reloadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
