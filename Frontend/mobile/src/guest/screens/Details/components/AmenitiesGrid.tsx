import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AmenitiesGrid({ amenities = [] }: { amenities?: string[] }) {
  return (
    <View className="mt-6 px-4">
      <Text className="mb-3 text-lg font-bold text-gray-900 dark:text-white">What this place offers</Text>
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {amenities.map((amenity) => (
          <View key={amenity} className="w-[48%] flex-row items-center gap-2.5 rounded-xl border border-transparent p-2.5 dark:border-[#1E2A45] dark:bg-[#141B2D]/70">
            <View className="h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-[#1E2A45]">
              <Ionicons name="checkmark" size={17} color="#7C3AED" />
            </View>
            <Text className="flex-1 text-sm font-medium text-gray-900 dark:text-white">{amenity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
