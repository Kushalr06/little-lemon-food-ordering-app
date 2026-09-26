import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function MenuItemCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.price}`}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
});
