import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = '@little_lemon_user_profile';
const ONBOARDING_COMPLETED_KEY = '@little_lemon_onboarding_completed';

export const DEFAULT_PROFILE = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  avatar: null,
  notifications: {
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  },
};

/**
 * Get the saved user profile from AsyncStorage.
 * Falls back to DEFAULT_PROFILE if nothing is saved.
 */
export async function getUserProfile() {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (jsonValue != null) {
      const parsed = JSON.parse(jsonValue);
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        notifications: {
          ...DEFAULT_PROFILE.notifications,
          ...(parsed.notifications || {}),
        },
      };
    }
    return DEFAULT_PROFILE;
  } catch (error) {
    console.error('Error reading user profile from AsyncStorage:', error);
    return DEFAULT_PROFILE;
  }
}

/**
 * Save user profile to AsyncStorage.
 */
export async function saveUserProfile(profile) {
  try {
    const jsonValue = JSON.stringify(profile);
    await AsyncStorage.setItem(USER_PROFILE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving user profile to AsyncStorage:', error);
    return false;
  }
}

/**
 * Check if the user has completed onboarding.
 */
export async function isOnboardingCompleted() {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

/**
 * Mark onboarding as completed or incomplete.
 */
export async function setOnboardingCompleted(completed) {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, completed ? 'true' : 'false');
    return true;
  } catch (error) {
    console.error('Error setting onboarding status:', error);
    return false;
  }
}

/**
 * Clear all Little Lemon data from AsyncStorage (used on logout).
 */
export async function clearAllData() {
  try {
    await AsyncStorage.multiRemove([USER_PROFILE_KEY, ONBOARDING_COMPLETED_KEY]);
    return true;
  } catch (error) {
    console.error('Error clearing data from AsyncStorage:', error);
    return false;
  }
}
