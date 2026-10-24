import { Image, Pressable, Text, View } from 'react-native';
import StatusBadge, { type ListingStatus } from './StatusBadge';

export type Listing = {
  title: string;
  city: string;
  bookings: number;
  status: ListingStatus;
  image: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <View className="flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <View className="flex-row items-center gap-3">
        <Image
          accessibilityLabel={listing.title}
          source={{ uri: listing.image }}
          resizeMode="cover"
          className="h-12 w-12 shrink-0 rounded-xl"
        />
        <Text numberOfLines={1} className="flex-1 text-base font-bold leading-snug text-gray-900 dark:text-white">
          {listing.title}
        </Text>
      </View>
      <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">
        {listing.city} · {listing.bookings} bookings
      </Text>
      <View className="flex-row items-center justify-between pt-1">
        <StatusBadge status={listing.status} />
        <Pressable accessibilityRole="button" className="rounded-full bg-[#EDE9FE] px-4 py-1.5 dark:bg-[#2A1F4E]">
          <Text className="text-sm font-semibold text-[#7C3AED] dark:text-[#A78BFA]">Manage</Text>
        </Pressable>
      </View>
    </View>
  );
}
