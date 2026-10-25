import React from 'react';
import { Feather } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useGuestTheme } from '../guest/theme/ThemeContext';

const tabs = [
  { label: 'Dashboard', path: '/houseadmin-dashboard', icon: 'home' },
  { label: 'Listings', path: '/houseadmin-listings', icon: 'file-text' },
  { label: 'Bookings', path: '/houseadmin-bookings', icon: 'calendar' },
];

export default function AdminTabNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark } = useGuestTheme();

  return (
    <View className="absolute bottom-4 left-4 right-4 h-16 flex-row items-center justify-around rounded-[32px] border border-[#E5E7EB] bg-white px-2 shadow-xl dark:border-[#1E2A45] dark:bg-[#141B2D]">
      {tabs.map((tab) => {
        const active = pathname === tab.path || (tab.label === 'Dashboard' && pathname === '/houseadmin/dashboard');
        const color = active ? (isDark ? '#A78BFA' : '#7C3AED') : (isDark ? '#94A3B8' : '#6B7280');
        return (
          <Pressable
            key={tab.path}
            accessibilityRole="button"
            accessibilityState={active ? { selected: true } : {}}
            onPress={() => router.push(tab.path)}
            className={`items-center justify-center rounded-full ${active ? 'flex-row gap-2 bg-[#EDE9FE] px-4 py-2 dark:bg-[#1E2A45]' : 'flex-col gap-0.5 px-3 py-1'}`}
          >
            <Feather name={tab.icon} size={active ? 16 : 20} color={color} />
            <Text className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`} style={{ color }}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
