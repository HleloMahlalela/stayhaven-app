import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import api, { resolveAssetUrl } from '../../../services/api';

export default function BookingsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { api.get<any[]>('/bookings/my-bookings').then(({ data }) => setBookings(Array.isArray(data) ? data : [])).catch(() => setError('Unable to load your bookings.')); }, []);
  return <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] px-4 dark:bg-[#0A0E1A]"><ScrollView contentContainerStyle={{ paddingBottom: 100 }}><View className="pt-8"><Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">YOUR STAYS</Text><Text className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Bookings</Text></View>{error ? <Text className="mt-8 text-center text-red-600">{error}</Text> : bookings.length ? bookings.map((booking) => { const listing = booking.listing || {}; return <View key={booking._id} className="mt-5 overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-[#1E2A45] dark:bg-[#141B2D]">{listing.images?.[0] ? <Image source={{ uri: resolveAssetUrl(listing.images[0]) }} className="h-44 w-full" resizeMode="cover" /> : null}<View className="p-4"><Text className="text-lg font-bold text-gray-900 dark:text-white">{listing.title || 'Stay'}</Text><Text className="mt-1 text-sm text-gray-500">{listing.location || ''}</Text><Text className="mt-3 text-sm text-gray-700 dark:text-gray-300">{new Date(booking.checkInDate).toLocaleDateString()} – {new Date(booking.checkOutDate).toLocaleDateString()}</Text><Text className="mt-1 text-sm capitalize text-gray-500">{booking.status}</Text><TouchableOpacity onPress={() => router.push({ pathname: '/messages', params: { listingId: listing._id, bookingId: booking._id } })} accessibilityRole="button" className="mt-4 self-start rounded-full bg-[#7C3AED] px-4 py-2"><Text className="text-sm font-semibold text-white">Message host</Text></TouchableOpacity></View></View>; }) : <View className="mt-8 rounded-2xl border border-dashed border-gray-300 p-8 dark:border-[#334155]"><Text className="text-center text-sm text-gray-500 dark:text-[#94A3B8]">You have no bookings yet.</Text></View>}</ScrollView></SafeAreaView>;
}
