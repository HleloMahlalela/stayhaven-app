import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGuestTheme } from '../guest/theme/ThemeContext';

type Props = { onClose: () => void; showThemeToggle?: boolean };

export default function GuestHeader({ onClose, showThemeToggle = true }: Props) {
  const { isDark, toggleTheme } = useGuestTheme();
  return (
    <View className="mb-8 flex-row items-center justify-between">
      <View className="flex-row items-center gap-2.5">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED] shadow-md dark:bg-[#8B5CF6]">
          <Ionicons name="home" size={19} color="#FFFFFF" />
        </View>
        <Text className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">StayHaven</Text>
      </View>
      <View className="flex-row items-center gap-2">
        {showThemeToggle ? (
          <TouchableOpacity onPress={toggleTheme} accessibilityRole="button" accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`} className="h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45]">
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={16} color={isDark ? '#FCD34D' : '#4B5563'} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" className="h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45]">
          <Ionicons name="close" size={18} color={isDark ? '#94A3B8' : '#374151'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
