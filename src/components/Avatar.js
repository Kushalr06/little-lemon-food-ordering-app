import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function Avatar({
  source,
  firstName = '',
  lastName = '',
  size = 40,
  fontSize = 16,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
}) {
  const getInitials = () => {
    const firstInitial = (firstName || '').trim().charAt(0).toUpperCase();
    const lastInitial = (lastName || '').trim().charAt(0).toUpperCase();
    const initials = `${firstInitial}${lastInitial}`.trim();
    return initials || 'LL';
  };

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };

  if (source && typeof source === 'string' && source.length > 0) {
    return (
      <Image
        source={{ uri: source }}
        style={[styles.image, containerStyle]}
        resizeMode="cover"
      />
    );
  }

  if (source && typeof source === 'number') {
    return (
      <Image
        source={source}
        style={[styles.image, containerStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.initialsContainer, containerStyle]}>
      <Text style={[styles.initialsText, { fontSize, color: textColor }]}>
        {getInitials()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initialsText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  image: {
    overflow: 'hidden',
  },
});
