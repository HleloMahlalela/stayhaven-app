import React from 'react';
import { Alert, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export type Booking = {
  id: string;
  bookingId: string;
  name: string;
  place: string;
  image: string;
  price: number;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  dates: string;
  room: string;
  type: 'current' | 'past';
  status: 'Confirmed' | 'Completed';
};

type Props = {
  booking: Booking;
  onCancel: (bookingId: string) => void;
};

const formatDate = (date: Date) => date.toLocaleDateString(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function BookingCard({ booking, onCancel }: Props) {
  const router = useRouter();

  const openDetails = () => {
    router.push({ pathname: '/details', params: { listingData: JSON.stringify(booking) } });
  };

  const confirmCancel = () => {
    if (booking.status === 'Completed') return;
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to cancel this booking?')) {
        onCancel(booking.id);
      }
      return;
    }

    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: () => onCancel(booking.id) },
      ],
    );
  };

  if (booking.status === 'Completed') {
    return (
      <View className="mb-4 overflow-hidden rounded-[32px] bg-[#f2f3ff]/60 dark:bg-[#171b28]/60">
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={openDetails}
          accessibilityRole="button"
          accessibilityLabel={`View completed stay at ${booking.name}`}
          className="flex-row items-center justify-between gap-3 p-4"
        >
          <Image source={{ uri: booking.image }} accessibilityLabel={booking.name} className="h-16 w-16 shrink-0 rounded-xl" resizeMode="cover" />
          <View className="min-w-0 flex-1">
            <Text className="text-lg font-semibold text-gray-900 dark:text-[#dfe2f3]" numberOfLines={1}>{booking.name}</Text>
            <Text className="text-sm text-gray-500 dark:text-[#958ea0]" numberOfLines={1}>{booking.place} · Stayed {booking.dates}</Text>
          </View>
          <View className="rounded-full bg-gray-100 px-3 py-1 dark:bg-[#2A3441]">
            <Text className="text-xs font-semibold text-gray-600 dark:text-gray-300">Completed</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="mb-4 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <View className="flex-row items-center justify-between gap-2 p-4">
        <Text className="min-w-0 flex-1 text-lg font-bold text-gray-900 dark:text-white" numberOfLines={1}>
          {booking.name}
        </Text>
        <View className="shrink-0 flex-row items-center gap-3">
          <View className="rounded-full bg-emerald-100 px-3 py-1 dark:bg-emerald-900/40">
            <Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{booking.status}</Text>
          </View>
          <TouchableOpacity onPress={confirmCancel} accessibilityRole="button" accessibilityLabel={`Cancel booking for ${booking.name}`}>
            <Text className="text-sm font-semibold text-[#7C3AED] dark:text-[#A78BFA]">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.92}
        onPress={openDetails}
        accessibilityRole="button"
        accessibilityLabel={`View ${booking.name} booking details`}
      >
        <Image source={{ uri: booking.image }} accessibilityLabel={booking.name} className="h-44 w-full" resizeMode="cover" />
        <View className="p-4 pt-3">
          <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">{booking.place}</Text>
          <View className="mt-3 flex-row items-center justify-between gap-2 rounded-2xl bg-violet-50 p-3 dark:bg-[#1E2A45]">
            <View className="min-w-0 flex-1">
              <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                {booking.dates || `${formatDate(booking.checkIn)} – ${formatDate(booking.checkOut)}`}
              </Text>
              <Text className="mt-0.5 text-xs text-gray-500 dark:text-[#94A3B8]">
                {booking.nights} nights · {booking.room}
              </Text>
            </View>
            <Text className="shrink-0 text-sm font-bold text-gray-900 dark:text-white">P{booking.price}/night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
