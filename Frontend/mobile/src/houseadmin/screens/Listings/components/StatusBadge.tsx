import { Text, View } from 'react-native';

export type ListingStatus = 'Active' | 'Paused';

export default function StatusBadge({ status }: { status: ListingStatus }) {
  const active = status === 'Active';

  return (
    <View className={`rounded-full px-3 py-1 ${active ? 'bg-[#DCFCE7] dark:bg-[#064E3B]' : 'bg-[#FEF3C7] dark:bg-[#3F2E0A]'}`}>
      <Text className={`text-xs font-semibold ${active ? 'text-[#166534] dark:text-[#4ADE80]' : 'text-[#92400E] dark:text-[#FBBF24]'}`}>
        {status}
      </Text>
    </View>
  );
}
