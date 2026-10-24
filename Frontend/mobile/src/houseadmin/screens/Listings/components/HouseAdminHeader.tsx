import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type Props = { dark: boolean; toggleTheme: () => void };

export default function HouseAdminHeader({ dark, toggleTheme }: Props) {
  return (
    <View className="flex-row items-center justify-between border-b border-transparent bg-[#F8F9FA] px-4 pb-2 pt-3 dark:border-[#1E2A45]/30 dark:bg-[#0A0E1A]">
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED] dark:bg-[#8B5CF6]">
          <Feather name="home" size={18} color="white" />
        </View>
        <Text className="text-[18px] font-bold tracking-tight text-black dark:text-white">StayHaven</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Pressable
          accessibilityLabel="Toggle theme"
          accessibilityRole="button"
          onPress={toggleTheme}
          className="h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-white dark:border-[#1E2A45] dark:bg-[#141B2D]"
        >
          <Feather name={dark ? 'sun' : 'moon'} size={16} color={dark ? '#94A3B8' : '#64748B'} />
        </Pressable>
        <Pressable accessibilityRole="button" className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <Text className="text-xs font-medium text-gray-700 dark:text-[#CBD5E1]">Sign out</Text>
        </Pressable>
        <View className="h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] dark:bg-[#8B5CF6]">
          <Feather name="user" size={16} color="white" />
        </View>
      </View>
    </View>
  );
}
