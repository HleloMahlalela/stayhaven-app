import { Feather } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type Tab = 'Dashboard' | 'Listings' | 'Bookings';
type Props = { dark: boolean; active: Tab };

export default function HouseAdminBottomNav({ dark, active }: Props) {
  const router = useRouter();
  const inactive = dark ? '#94A3B8' : '#6B7280';
  const tabs: { label: Tab; icon: 'home' | 'file-text' | 'calendar'; route: Href }[] = [
    { label: 'Dashboard', icon: 'home', route: '/houseadmin-dashboard' },
    { label: 'Listings', icon: 'file-text', route: '/houseadmin-listings' },
    { label: 'Bookings', icon: 'calendar', route: '/houseadmin-bookings' },
  ];
  return (
    <View className="absolute bottom-4 h-16 w-[calc(100%-32px)] max-w-[358px] self-center flex-row items-center justify-around rounded-[32px] border border-gray-200 bg-white px-2 shadow-xl dark:border-[#1E2A45] dark:bg-[#141B2D] dark:shadow-2xl">
      {tabs.map((tab) => {
        const selected = active === tab.label;
        return <Pressable key={tab.label} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => router.push(tab.route)} className={selected ? 'flex-row items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3 py-1 dark:bg-[#1E2A45]' : 'items-center justify-center gap-0.5 px-3 py-1'}>
          <Feather name={tab.icon} size={selected ? 16 : 20} color={selected ? (dark ? '#8B5CF6' : '#7C3AED') : inactive} />
          <Text className={selected ? 'text-xs font-semibold text-[#7C3AED] dark:text-[#8B5CF6]' : 'text-xs font-medium text-gray-500 dark:text-[#94A3B8]'}>{tab.label}</Text>
        </Pressable>;
      })}
    </View>
  );
}
