import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  price: number;
  discount: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  onChooseCheckIn: () => void;
  onChooseCheckOut: () => void;
  onChooseGuests: () => void;
};

function dateLabel(date: Date | null) {
  return date ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Choose date';
}

export default function BookingCard({ price, discount, checkIn, checkOut, guests, onChooseCheckIn, onChooseCheckOut, onChooseGuests }: Props) {
  const dateDifference = checkIn && checkOut
    ? Math.ceil((new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate()).getTime() - new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate()).getTime()) / (1000 * 60 * 60 * 24))
    : 1;
  const nights = Number.isFinite(dateDifference) && dateDifference > 0 ? dateDifference : 1;
  const subtotal = price * nights;
  const appliedDiscount = nights >= 2 ? discount : 0;
  const total = subtotal - appliedDiscount;

  return (
    <View className="mx-4 mb-4 mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <View className="flex-row items-baseline gap-1"><Text className="text-2xl font-bold text-gray-900 dark:text-white">P{price}</Text><Text className="text-sm text-gray-500 dark:text-[#94A3B8]">/ night</Text></View>
      <View className="mt-4">
        <View className="mb-1 flex-row"><Text className="flex-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#94A3B8]">Check-in</Text><Text className="flex-1 pl-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#94A3B8]">Check-out</Text></View>
        <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 p-2 dark:border-[#1E2A45] dark:bg-[#0A0E1A]">
          <TouchableOpacity onPress={onChooseCheckIn} accessibilityRole="button" className="min-w-0 flex-1 flex-row items-center justify-between px-1 py-2"><Text numberOfLines={1} className="text-xs text-gray-700 dark:text-white">{dateLabel(checkIn)}</Text><Ionicons name="calendar-outline" size={16} color="#94A3B8" /></TouchableOpacity>
          <View className="mx-1 h-7 border-l border-gray-300 dark:border-[#334155]" />
          <TouchableOpacity onPress={onChooseCheckOut} accessibilityRole="button" className="min-w-0 flex-1 flex-row items-center justify-between px-1 py-2"><Text numberOfLines={1} className="text-xs text-gray-700 dark:text-white">{dateLabel(checkOut)}</Text><Ionicons name="calendar-outline" size={16} color="#94A3B8" /></TouchableOpacity>
        </View>
        <View className="mt-3"><Text className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#94A3B8]">Guests</Text><TouchableOpacity onPress={onChooseGuests} accessibilityRole="button" className="flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-[#1E2A45] dark:bg-[#0A0E1A]"><Text className="text-sm text-gray-700 dark:text-white">{guests} {guests === 1 ? 'guest' : 'guests'}</Text><Ionicons name="chevron-down" size={16} color="#94A3B8" /></TouchableOpacity></View>
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Success', `Booking request for ${guests} ${guests === 1 ? 'guest' : 'guests'} and ${nights} ${nights === 1 ? 'night' : 'nights'}. Total: P${total}`)} accessibilityRole="button" className="mt-4 items-center rounded-full bg-[#7C3AED] py-3.5 shadow-md"><Text className="text-[15px] font-semibold text-white">Reserve this stay</Text></TouchableOpacity>
      <Text className="mt-2.5 text-center text-xs text-gray-400 dark:text-[#94A3B8]">You won't be charged yet</Text>
      <View className="my-4 border-t border-gray-100 dark:border-[#1E2A45]" />
      <View className="gap-2">
        <View className="flex-row justify-between"><Text className="text-sm text-gray-600 dark:text-[#94A3B8]">P{price} x {nights} nights</Text><Text className="text-sm font-medium text-gray-900 dark:text-white">P{subtotal}</Text></View>
        <View className="flex-row justify-between"><Text className="text-sm text-gray-600 dark:text-[#94A3B8]">Discount</Text><Text className="text-sm font-medium text-gray-900 dark:text-white">{appliedDiscount > 0 ? `-P${appliedDiscount}` : 'P0'}</Text></View>
        <View className="mt-1 flex-row justify-between border-t border-gray-100 pt-3 dark:border-[#1E2A45]"><Text className="text-[15px] font-bold text-gray-900 dark:text-white">Total</Text><Text className="text-[15px] font-bold text-gray-900 dark:text-white">P{total}</Text></View>
      </View>
    </View>
  );
}
