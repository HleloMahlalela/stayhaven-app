import { Text, View } from 'react-native';

export type GuestAvatarTone = 'sophie' | 'marcus' | 'elena';
const tones: Record<GuestAvatarTone, string> = {
  sophie: 'bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#C4B5FD] dark:border dark:border-[#8B5CF6]/30',
  marcus: 'bg-[#FEF3C7] text-[#D97706] dark:bg-[#3F2E0A] dark:text-[#FDE68A] dark:border dark:border-amber-500/30',
  elena: 'bg-[#DBEAFE] text-[#2563EB] dark:bg-[#1E3A5F] dark:text-[#93C5FD] dark:border dark:border-blue-500/30',
};

export default function GuestAvatar({ initials, tone }: { initials: string; tone: GuestAvatarTone }) {
  return <View className={`h-10 w-10 shrink-0 items-center justify-center rounded-full ${tones[tone]}`}><Text className="text-sm font-semibold">{initials}</Text></View>;
}
