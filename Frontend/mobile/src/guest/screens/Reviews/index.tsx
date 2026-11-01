import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockData } from '../Explore/listings';

const reviews: Array<{ id: string; listingId: string; author: string; body: string }> = [];

export default function ReviewsScreen() {
  return <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] px-4 dark:bg-[#0A0E1A]"><View className="pt-8"><Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">YOUR EXPERIENCES</Text><Text className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Reviews</Text>
    {reviews.length ? reviews.map((review) => {
      const listing = mockData.find((item) => item.id === review.listingId);
      return <View key={review.id} className="mt-4 flex-row gap-3 rounded-2xl bg-white p-4 dark:bg-[#141B2D]"><View className="flex-1"><Text className="font-semibold text-gray-900 dark:text-white">{listing?.name}</Text><Text className="text-xs text-gray-500 dark:text-[#94A3B8]">{listing?.place}</Text><Text className="mt-2 text-sm text-gray-700 dark:text-[#CBD5E1]">{review.body}</Text></View></View>;
    }) : <View className="mt-8 rounded-2xl border border-dashed border-gray-300 p-8 dark:border-[#334155]"><Text className="text-center text-base text-gray-500 dark:text-[#94A3B8]">No reviews yet. After your stay, share your experience.</Text></View>}
  </View></SafeAreaView>;
}
