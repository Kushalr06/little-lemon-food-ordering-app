import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function OnboardingScreen({ navigation }) {
  const { completeOnboarding } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation regex (standard, forgiving format)
  const isEmailValid = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text.trim());
  };

  const isFirstNameValid = firstName.trim().length > 0;
  const isFormValid = isFirstNameValid && isEmailValid(email);

  const handleNext = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await completeOnboarding({
        firstName,
        lastName,
        email,
      });
      // Navigation stack will either auto-switch or we can explicitly navigate
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Failed to save onboarding information. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to save onboarding information. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Little Lemon Logo */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>Little Lemon</Text>
            <Text style={styles.heroSubtitle}>Chicago</Text>
            <View style={styles.heroRow}>
              <Text style={styles.heroDescription}>
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Text>
              <Image
                source={require('../../assets/images/hero.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Onboarding Form Card */}
          <View style={styles.formContainer}>
            <Text style={styles.formHeading}>Let us get to know you</Text>
            <Text style={styles.formSubheading}>
              Please enter your details to personalize your ordering experience.
            </Text>

            {/* First Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                First Name <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  firstNameTouched && !isFirstNameValid && styles.inputError,
                ]}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                  if (!firstNameTouched) setFirstNameTouched(true);
                }}
                onBlur={() => setFirstNameTouched(true)}
                autoCapitalize="words"
                returnKeyType="next"
                accessibilityLabel="First Name input field"
              />
              {firstNameTouched && !isFirstNameValid && (
                <Text style={styles.errorText}>First name is required</Text>
              )}
            </View>

            {/* Last Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                returnKeyType="next"
                accessibilityLabel="Last Name input field"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Email <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  emailTouched && !isEmailValid(email) && styles.inputError,
                ]}
                placeholder="example@domain.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (!emailTouched) setEmailTouched(true);
                }}
                onBlur={() => setEmailTouched(true)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleNext}
                accessibilityLabel="Email input field"
              />
              {emailTouched && !isEmailValid(email) && (
                <Text style={styles.errorText}>Please enter a valid email address</Text>
              )}
            </View>

            {/* Notice */}
            <Text style={styles.noticeText}>
              * Next button will activate when required fields are completed with a valid email.
            </Text>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                !isFormValid && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!isFormValid || isSubmitting}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Next button to complete onboarding"
            >
              <Text
                style={[
                  styles.nextButtonText,
                  !isFormValid && styles.nextButtonTextDisabled,
                ]}
              >
                {isSubmitting ? 'Saving...' : 'Next'}
              </Text>
            </TouchableOpacity>
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
    paddingBottom: 30,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: COLORS.white,
  },
  logoImage: {
    width: 200,
    height: 44,
  },
  heroBanner: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  heroTitle: {
    fontFamily: 'serif',
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  heroSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: -2,
    marginBottom: 8,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroDescription: {
    flex: 1,
    fontSize: 14,
    color: '#EDEFEE',
    lineHeight: 20,
    paddingRight: 12,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
    backgroundColor: '#3E504A',
  },
  formContainer: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  formHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  formSubheading: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 24,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  requiredAsterisk: {
    color: COLORS.danger,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.charcoal,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },
  noticeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  nextButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: COLORS.charcoal,
    fontSize: 16,
    fontWeight: '700',
  },
  nextButtonTextDisabled: {
    color: '#9CA3AF',
  },
});
