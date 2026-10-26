import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGuestTheme } from '@/guest/theme/ThemeContext';
import AdminTabNavigator from '@/navigation/AdminTabNavigator';
import HouseAdminHeader from '../Listings/components/HouseAdminHeader';

export default function BookingsScreen() {
  const { isDark, toggleTheme } = useGuestTheme();
  return (
    <SafeAreaView edges={['top']} className="max-w-[390px] w-full flex-1 self-center bg-[#F8F9FA] dark:bg-[#0A0E1A]">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <HouseAdminHeader dark={isDark} toggleTheme={toggleTheme} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View className="mx-4 mt-6">
          <Text className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</Text>
          <Text className="mt-1 text-[28px] leading-[34px] font-bold text-[#111827] dark:text-white">Bookings</Text>
          <Text className="mt-1 text-sm text-[#6B7280] dark:text-[#94A3B8]">Manage upcoming and current guest stays.</Text>
        </View>
        <View className="mx-4 mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <Text className="text-sm text-[#6B7280] dark:text-[#94A3B8]">Your bookings will appear here.</Text>
        </View>
      </ScrollView>
      <AdminTabNavigator />
    </SafeAreaView>
  );
}
