import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  price: number;
  checkIn: Date | null;
  guests: number;
  onChooseDate: () => void;
  onChooseGuests: () => void;
};

function Selector({ label, value, icon, onPress }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  return (
    <View>
      <Text className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#94A3B8]">{label}</Text>
      <TouchableOpacity onPress={onPress} accessibilityRole="button" className="flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-[#1E2A45] dark:bg-[#0A0E1A]">
        <Text className="text-sm text-gray-700 dark:text-white">{value}</Text>
        <Ionicons name={icon} size={16} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
}

export default function BookingCard({ price, checkIn, guests, onChooseDate, onChooseGuests }: Props) {
  const nights = 3;
  const discount = 20;
  const subtotal = price * nights;
  const total = subtotal - discount;
  const dateLabel = checkIn ? checkIn.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Choose a date';

  return (
    <View className="mx-4 mb-4 mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <View className="flex-row items-baseline gap-1"><Text className="text-2xl font-bold text-gray-900 dark:text-white">${price}</Text><Text className="text-sm text-gray-500 dark:text-[#94A3B8]">/ night</Text></View>
      <View className="mt-4 gap-3">
        <Selector label="Check-in" value={dateLabel} icon="calendar-outline" onPress={onChooseDate} />
        <Selector label="Guests" value={`${guests} ${guests === 1 ? 'guest' : 'guests'}`} icon="chevron-down" onPress={onChooseGuests} />
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Success', `Booking confirmed for ${guests} ${guests === 1 ? 'guest' : 'guests'} on ${dateLabel}!`)} accessibilityRole="button" className="mt-4 items-center rounded-full bg-[#7C3AED] py-3.5 shadow-md"><Text className="text-[15px] font-semibold text-white">Reserve this stay</Text></TouchableOpacity>
      <Text className="mt-2.5 text-center text-xs text-gray-400 dark:text-[#94A3B8]">You won't be charged yet</Text>
      <View className="my-4 border-t border-gray-100 dark:border-[#1E2A45]" />
      <View className="gap-2">
        <View className="flex-row justify-between"><Text className="text-sm text-gray-600 dark:text-[#94A3B8]">${price} × {nights} nights</Text><Text className="text-sm font-medium text-gray-900 dark:text-white">${subtotal}</Text></View>
        <View className="flex-row justify-between"><Text className="text-sm text-gray-600 dark:text-[#94A3B8]">Discount</Text><Text className="text-sm font-medium text-[#7C3AED]">-${discount}</Text></View>
        <View className="mt-1 flex-row justify-between border-t border-gray-100 pt-3 dark:border-[#1E2A45]"><Text className="text-[15px] font-bold text-gray-900 dark:text-white">Total</Text><Text className="text-[15px] font-bold text-gray-900 dark:text-white">${total}</Text></View>
      </View>
    </View>
  );
}
