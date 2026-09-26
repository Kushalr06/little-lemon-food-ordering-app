import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import Avatar from './Avatar';

export default function Header({
  showBack = false,
  onBackPress,
  showProfile = true,
  onProfilePress,
  userProfile = {},
}) {
  return (
    <View style={styles.container}>
      {/* Left section: Back button or empty placeholder */}
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Center section: Little Lemon Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Right section: Profile button or placeholder */}
      <View style={styles.rightContainer}>
        {showProfile ? (
          <TouchableOpacity
            onPress={onProfilePress}
            activeOpacity={0.8}
            accessibilityLabel="Open profile"
            accessibilityRole="button"
          >
            <Avatar
              source={userProfile?.avatar}
              firstName={userProfile?.firstName}
              lastName={userProfile?.lastName}
              size={40}
              fontSize={15}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 180,
    height: 42,
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
    marginLeft: -2,
  },
  placeholder: {
    width: 36,
    height: 36,
  },
});
