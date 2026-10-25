import { Text, View } from 'react-native';

export type BookingStatus = 'Confirmed' | 'Checked in';
export default function StatusBadge({ status }: { status: BookingStatus }) {
  const confirmed = status === 'Confirmed';
  return <View className={confirmed ? 'rounded-full border border-emerald-200/50 bg-[#DCFCE7] px-3 py-1 dark:border-[#065F46]/20 dark:bg-[#064E3B]' : 'rounded-full border border-purple-200/50 bg-[#F3E8FF] px-3 py-1 dark:border-[#1E2A45] dark:bg-[#1E2A45]'}>
    <Text className={confirmed ? 'text-xs font-semibold text-[#166534] dark:text-[#4ADE80]' : 'text-xs font-semibold text-[#7C3AED] dark:text-[#8B5CF6]'}>{status}</Text>
  </View>;
}
