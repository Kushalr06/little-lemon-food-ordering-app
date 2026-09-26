import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors';

export default function Hero({
  searchQuery = '',
  onChangeSearchText,
  showSearch = true,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Chicago</Text>

      <View style={styles.contentRow}>
        <Text style={styles.description}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          source={require('../../assets/images/hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search menu (e.g. Pasta, Salad)..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={onChangeSearchText}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Search menu items"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => onChangeSearchText('')}
              style={styles.clearButton}
              accessibilityLabel="Clear search text"
              accessibilityRole="button"
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 38,
    fontWeight: '700',
    color: COLORS.secondary,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: -4,
    marginBottom: 8,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: '#EDEFEE',
    lineHeight: 20,
    paddingRight: 12,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 14,
    backgroundColor: '#3E504A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.charcoal,
    height: '100%',
  },
  clearButton: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '700',
  },
});
