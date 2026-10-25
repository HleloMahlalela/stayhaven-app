import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import GuestAvatar, { type GuestAvatarTone } from './GuestAvatar';
import StatusBadge, { type BookingStatus } from './StatusBadge';

export type Booking = { initials: string; name: string; property: string; dates: string; status: BookingStatus; tone: GuestAvatarTone };
export default function BookingCard({ booking, dark }: { booking: Booking; dark: boolean }) {
  return <View className="flex-col gap-3 rounded-[32px] border border-gray-100 bg-white p-4 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
    <View className="flex-row items-start justify-between">
      <View className="min-w-0 flex-1 flex-row items-center gap-3">
        <GuestAvatar initials={booking.initials} tone={booking.tone} />
        <View className="min-w-0 flex-1"><Text numberOfLines={1} className="text-[16px] font-bold leading-snug text-gray-900 dark:text-white">{booking.name}</Text><Text numberOfLines={1} className="text-sm leading-normal text-gray-500 dark:text-[#94A3B8]">{booking.property}</Text></View>
      </View>
      <View className="ml-2"><StatusBadge status={booking.status} /></View>
    </View>
    <View className="mt-1 flex-row items-center justify-between border-t border-gray-100 pt-2 dark:border-[#1E2A45]/40">
      <View className="flex-row items-center gap-1.5"><Feather name="calendar" size={14} color={dark ? '#94A3B8' : '#6B7280'} /><Text className="text-sm font-medium text-gray-500 dark:text-[#94A3B8]">{booking.dates}</Text></View>
      <Pressable accessibilityRole="button" className="rounded-full bg-[#EDE9FE] px-4 py-1.5 dark:bg-[#2A1F4E]"><Text className="text-sm font-semibold text-[#7C3AED] dark:text-[#A78BFA]">Manage</Text></Pressable>
    </View>
  </View>;
}
