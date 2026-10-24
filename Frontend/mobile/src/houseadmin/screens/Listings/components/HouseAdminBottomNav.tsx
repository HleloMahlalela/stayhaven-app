import { Feather } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type Props = { dark: boolean };

export default function HouseAdminBottomNav({ dark }: Props) {
  const router = useRouter();
  const inactive = dark ? '#94A3B8' : '#6B7280';

  return (
    <View className="absolute bottom-4 h-16 w-[calc(100%-32px)] max-w-[358px] self-center flex-row items-center justify-around rounded-[32px] border border-gray-200 bg-white px-2 shadow-xl dark:border-[#1E2A45] dark:bg-[#141B2D] dark:shadow-2xl">
      <Pressable accessibilityRole="button" onPress={() => router.push('/houseadmin-dashboard' as Href)} className="items-center justify-center gap-0.5 px-3 py-1">
        <Feather name="home" size={20} color={inactive} />
        <Text className="text-xs font-medium text-gray-500 dark:text-[#94A3B8]">Dashboard</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => router.push('/houseadmin-listings' as Href)} className="flex-row items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3 py-1 dark:bg-[#1E2A45]">
        <Feather name="file-text" size={16} color={dark ? '#8B5CF6' : '#7C3AED'} />
        <Text className="text-xs font-semibold text-[#7C3AED] dark:text-[#8B5CF6]">Listings</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => router.push('/houseadmin-bookings' as Href)} className="items-center justify-center gap-0.5 px-3 py-1">
        <Feather name="calendar" size={20} color={inactive} />
        <Text className="text-xs font-medium text-gray-500 dark:text-[#94A3B8]">Bookings</Text>
      </Pressable>
    </View>
  );
}
