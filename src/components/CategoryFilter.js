import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { CATEGORIES } from '../data/menuItems';

export default function CategoryFilter({
  categories = CATEGORIES,
  selectedCategory = 'All',
  onSelectCategory,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ORDER FOR DELIVERY!</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                isSelected ? styles.categoryPillSelected : styles.categoryPillUnselected,
              ]}
              onPress={() => onSelectCategory(category)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Filter by ${category}`}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected ? styles.categoryTextSelected : styles.categoryTextUnselected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillSelected: {
    backgroundColor: COLORS.primary,
  },
  categoryPillUnselected: {
    backgroundColor: COLORS.lightGray,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTextSelected: {
    color: COLORS.white,
  },
  categoryTextUnselected: {
    color: COLORS.primary,
  },
});
