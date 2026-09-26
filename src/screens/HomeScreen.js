import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { MENU_ITEMS, CATEGORIES } from '../data/menuItems';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import MenuItemCard from '../components/MenuItemCard';

export default function HomeScreen({ navigation }) {
  const { userProfile } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtered menu items based on both search query and selected category
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter check
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search query check (case-insensitive)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Header component for FlatList: Contains SECTION 2 (Hero) & SECTION 3 (Menu Breakdown)
  const renderListHeader = () => (
    <View>
      {/* SECTION 2: HERO (Little Lemon, Chicago, Description, Food Image, Search Bar) */}
      <Hero
        searchQuery={searchQuery}
        onChangeSearchText={setSearchQuery}
        showSearch={true}
      />

      {/* SECTION 3: MENU BREAKDOWN ("ORDER FOR DELIVERY!", Category Buttons) */}
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
    </View>
  );

  // Empty state when search or category filter has no results
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍽️</Text>
      <Text style={styles.emptyTitle}>No menu items found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? `We couldn't find any dishes matching "${searchQuery}".`
          : `No items available in category "${selectedCategory}".`}
      </Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          setSearchQuery('');
          setSelectedCategory('All');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.resetButtonText}>Reset Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* SECTION 1: HEADER (Little Lemon logo/name & Profile/avatar button) */}
      <Header
        showBack={false}
        showProfile={true}
        onProfilePress={handleProfilePress}
        userProfile={userProfile}
      />

      {/* SECTION 4: FOOD MENU LIST (Scrollable FlatList) */}
      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    backgroundColor: COLORS.white,
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
