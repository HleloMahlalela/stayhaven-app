import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGuestTheme } from '../theme/ThemeContext';

export default function PlaceholderScreen({ title }) {
  const { isDark } = useGuestTheme();
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-[#0A0E1A]' : 'bg-[#F8F9FA]'}`}>
      <View className="flex-1 items-center justify-center">
        <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-950'}`}>{title}</Text>
        <Text className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Your {title.toLowerCase()} will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}
