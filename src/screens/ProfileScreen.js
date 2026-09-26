import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Avatar from '../components/Avatar';

// Sample avatar preset for the Change button
const SAMPLE_AVATAR_URI = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

export default function ProfileScreen({ navigation }) {
  const { userProfile, updateProfile, logout } = useAuth();

  // Local form state initialized from userProfile
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
  const [avatar, setAvatar] = useState(userProfile?.avatar || null);

  const [notifications, setNotifications] = useState({
    orderStatuses: userProfile?.notifications?.orderStatuses ?? true,
    passwordChanges: userProfile?.notifications?.passwordChanges ?? true,
    specialOffers: userProfile?.notifications?.specialOffers ?? true,
    newsletter: userProfile?.notifications?.newsletter ?? true,
  });

  const [isSaving, setIsSaving] = useState(false);

  // Sync state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || '');
      setLastName(userProfile.lastName || '');
      setEmail(userProfile.email || '');
      setPhoneNumber(userProfile.phoneNumber || '');
      setAvatar(userProfile.avatar || null);
      if (userProfile.notifications) {
        setNotifications({
          orderStatuses: userProfile.notifications.orderStatuses ?? true,
          passwordChanges: userProfile.notifications.passwordChanges ?? true,
          specialOffers: userProfile.notifications.specialOffers ?? true,
          newsletter: userProfile.notifications.newsletter ?? true,
        });
      }
    }
  }, [userProfile]);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAvatarChange = () => {
    if (Platform.OS === 'web') {
      if (!avatar) {
        setAvatar(SAMPLE_AVATAR_URI);
      } else {
        const usePhoto = window.confirm('Press OK to use Photo Avatar, or Cancel to use Initials.');
        setAvatar(usePhoto ? SAMPLE_AVATAR_URI : null);
      }
      return;
    }

    Alert.alert(
      'Profile Avatar',
      'Choose an avatar option',
      [
        {
          text: 'Use Photo Avatar',
          onPress: () => setAvatar(SAMPLE_AVATAR_URI),
        },
        {
          text: 'Use Default Initials',
          onPress: () => setAvatar(null),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleAvatarRemove = () => {
    setAvatar(null);
  };

  const handleDiscardChanges = () => {
    setFirstName(userProfile?.firstName || '');
    setLastName(userProfile?.lastName || '');
    setEmail(userProfile?.email || '');
    setPhoneNumber(userProfile?.phoneNumber || '');
    setAvatar(userProfile?.avatar || null);
    setNotifications({
      orderStatuses: userProfile?.notifications?.orderStatuses ?? true,
      passwordChanges: userProfile?.notifications?.passwordChanges ?? true,
      specialOffers: userProfile?.notifications?.specialOffers ?? true,
      newsletter: userProfile?.notifications?.newsletter ?? true,
    });

    if (Platform.OS === 'web') {
      window.alert('All unsaved changes have been reverted.');
    } else {
      Alert.alert('Discarded', 'All unsaved changes have been reverted.');
    }
  };

  const isEmailValid = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text.trim());
  };

  const handleSaveChanges = async () => {
    if (!firstName.trim()) {
      if (Platform.OS === 'web') {
        window.alert('First name cannot be empty.');
      } else {
        Alert.alert('Missing Field', 'First name cannot be empty.');
      }
      return;
    }

    if (!isEmailValid(email)) {
      if (Platform.OS === 'web') {
        window.alert('Please enter a valid email address.');
      } else {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
      }
      return;
    }

    try {
      setIsSaving(true);
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        avatar,
        notifications,
      });

      if (Platform.OS === 'web') {
        window.alert('Profile changes saved successfully!');
      } else {
        Alert.alert('Success', 'Profile changes saved successfully!');
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Failed to save changes. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to save changes. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    const executeLogout = async () => {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    };

    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to log out? Your saved data will be cleared.');
      if (confirmed) {
        executeLogout();
      }
      return;
    }

    Alert.alert(
      'Log Out',
      'Are you sure you want to log out? Your saved data will be cleared.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: executeLogout,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header with Back button and Little Lemon Logo */}
      <Header
        showBack={true}
        onBackPress={() => navigation.goBack()}
        showProfile={true}
        userProfile={{ firstName, lastName, avatar }}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Personal Information</Text>

            {/* Avatar Section */}
            <Text style={styles.sectionLabel}>Avatar</Text>
            <View style={styles.avatarRow}>
              <Avatar
                source={avatar}
                firstName={firstName}
                lastName={lastName}
                size={80}
                fontSize={30}
              />
              <View style={styles.avatarButtonsContainer}>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={handleAvatarChange}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel="Change avatar"
                >
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={handleAvatarRemove}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel="Remove avatar"
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Fields */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                accessibilityLabel="First Name"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                accessibilityLabel="Last Name"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email Address"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="(555) 000-0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                accessibilityLabel="Phone Number"
              />
            </View>

            {/* Email Notifications */}
            <Text style={styles.notificationsHeading}>Email notifications</Text>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleNotification('orderStatuses')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.orderStatuses }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.orderStatuses && styles.checkboxActive,
                ]}
              >
                {notifications.orderStatuses && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>Order statuses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleNotification('passwordChanges')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.passwordChanges }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.passwordChanges && styles.checkboxActive,
                ]}
              >
                {notifications.passwordChanges && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>Password changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleNotification('specialOffers')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.specialOffers }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.specialOffers && styles.checkboxActive,
                ]}
              >
                {notifications.specialOffers && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>Special offers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleNotification('newsletter')}
              activeOpacity={0.7}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: notifications.newsletter }}
            >
              <View
                style={[
                  styles.checkbox,
                  notifications.newsletter && styles.checkboxActive,
                ]}
              >
                {notifications.newsletter && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>Newsletter</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Log out of application"
            >
              <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>

            {/* Save / Discard Actions */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={handleDiscardChanges}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Discard changes"
              >
                <Text style={styles.discardButtonText}>Discard changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
                disabled={isSaving}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Save changes"
              >
                <Text style={styles.saveButtonText}>
                  {isSaving ? 'Saving...' : 'Save changes'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 36,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarButtonsContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  changeButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  changeButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
  },
  removeButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeButtonText: {
    color: COLORS.charcoal,
    fontWeight: '600',
    fontSize: 13,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.charcoal,
  },
  notificationsHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginTop: 10,
    marginBottom: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.charcoal,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EAB308',
  },
  logoutButtonText: {
    color: COLORS.charcoal,
    fontSize: 15,
    fontWeight: '800',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  discardButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  discardButtonText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
