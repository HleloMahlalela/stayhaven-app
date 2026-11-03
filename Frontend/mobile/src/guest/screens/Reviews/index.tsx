import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../../services/api';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => { api.get<any[]>('/listings').then(async ({ data: listings }) => { const results = await Promise.all((Array.isArray(listings) ? listings : []).map(async (listing: any) => { try { const response = await api.get<any[]>(`/reviews/${listing._id}`); return (Array.isArray(response.data) ? response.data : []).map((review) => ({ ...review, listingTitle: listing.title, location: listing.location })); } catch { return []; } })); setReviews(results.flat()); }).catch(() => setReviews([])); }, []);
  return <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] px-4 dark:bg-[#0A0E1A]"><ScrollView contentContainerStyle={{ paddingBottom: 100 }}><View className="pt-8"><Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">GUEST FEEDBACK</Text><Text className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Reviews</Text></View>{reviews.length ? reviews.map((review, index) => <View key={review._id || index} className="mt-4 rounded-2xl bg-white p-4 dark:bg-[#141B2D]"><Text className="font-semibold text-gray-900 dark:text-white">{review.listingTitle}</Text><Text className="text-xs text-gray-500">{review.location}</Text><Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">{review.comment || review.body || review.text}</Text></View>) : <View className="mt-8 rounded-2xl border border-dashed border-gray-300 p-8 dark:border-[#334155]"><Text className="text-center text-base text-gray-500 dark:text-[#94A3B8]">No reviews yet.</Text></View>}</ScrollView></SafeAreaView>;
}
