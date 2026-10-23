import { ScrollView, StatusBar, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useGuestTheme } from '@/guest/theme/ThemeContext';

const bookings = [
  { initials: 'SC', name: 'Sophie Chen', home: 'Cedar Haven Cottage', dates: 'Oct 18–22', status: 'Confirmed', avatar: 'bg-purple-100 dark:bg-[#2A1F4E]', avatarText: 'text-[#7C3AED] dark:text-[#C4B5FD]' },
  { initials: 'MK', name: 'Marcus Kelly', home: 'Hilltop Modern Villa', dates: 'Oct 24–28', status: 'Checked in', avatar: 'bg-amber-100 dark:bg-[#3F2E0A]', avatarText: 'text-amber-700 dark:text-[#FDE68A]' },
  { initials: 'EJ', name: 'Elena & Julian', home: 'Lakeside Pine Retreat', dates: 'Nov 2–7', status: 'Confirmed', avatar: 'bg-blue-100 dark:bg-[#1E3A5F]', avatarText: 'text-blue-700 dark:text-[#93C5FD]' },
];

function Header({ dark, toggleTheme }) {
  return <View className="px-4 pt-3 pb-2 flex-row items-center justify-between bg-[#F8F9FA] dark:bg-[#0A0E1A] border-b border-transparent dark:border-[#1E2A45]/30">
    <View className="flex-row items-center gap-2.5"><View className="w-8 h-8 rounded-lg bg-[#7C3AED] dark:bg-[#8B5CF6] items-center justify-center"><Feather name="home" size={17} color="white" /></View><Text className="text-[18px] font-bold tracking-tight text-black dark:text-white">StayHaven</Text></View>
    <View className="flex-row items-center gap-2">
      <Pressable accessibilityLabel="Toggle dark mode" onPress={toggleTheme} className="w-9 h-9 rounded-full bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#1E2A45] items-center justify-center"><Feather name={dark ? 'sun' : 'moon'} size={16} color={dark ? '#F1F5F9' : '#4B5563'} /></Pressable>
      <Pressable className="bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#1E2A45] rounded-full px-3 py-1.5"><Text className="text-xs font-medium text-gray-700 dark:text-slate-300">Sign out</Text></Pressable>
      <View className="w-8 h-8 rounded-full bg-[#7C3AED] dark:bg-[#8B5CF6] items-center justify-center"><Feather name="user" size={16} color="white" /></View>
    </View>
  </View>;
}

function StatCard({ label, value, detail, positive, star, dot }) {
  return <View className="w-[48%] min-h-[108px] bg-white dark:bg-[#141B2D] rounded-2xl p-4 border border-gray-100 dark:border-[#1E2A45]">
    <Text className="text-xs font-medium text-gray-500 dark:text-[#94A3B8]">{label}</Text>
    <View className="flex-row items-center mt-1"><Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>{star && <Text className="text-amber-400 text-2xl ml-1">★</Text>}</View>
    <View className="flex-row items-center mt-1">{positive && <Feather name="arrow-up" size={13} color="#4ADE80" />}{dot && <View className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mr-1.5" />}<Text className={`text-xs font-medium ${positive ? 'text-green-600 dark:text-[#4ADE80]' : 'text-gray-500 dark:text-[#94A3B8]'}`}>{detail}</Text></View>
  </View>;
}

export default function DashboardScreen() {
  const { isDark, toggleTheme } = useGuestTheme();
  return <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] dark:bg-[#0A0E1A] max-w-[390px] w-full self-center">
    <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
    <Header dark={isDark} toggleTheme={toggleTheme} />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 112 }}>
      <View className="mx-4 mt-6">
        <Text className="text-xs uppercase tracking-wider font-bold text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</Text>
        <Text className="text-[28px] leading-[34px] font-bold text-[#111827] dark:text-white mt-1">Good morning, Amara.</Text>
        <Text className="text-sm text-[#6B7280] dark:text-[#94A3B8] mt-1">Here's what's happening with your guesthouses.</Text>
        <Pressable className="mt-4 w-full py-3 rounded-full bg-[#7C3AED] dark:bg-[#8B5CF6] flex-row items-center justify-center"><Feather name="plus" size={16} color="white" /><Text className="text-white text-sm font-semibold ml-1.5">Request new listing</Text></Pressable>
      </View>
      <View className="mx-4 mt-6 flex-row flex-wrap justify-between gap-y-3">
        <StatCard label="Active listings" value="4" detail="+1 this month" positive />
        <StatCard label="Upcoming stays" value="12" detail="Next: tomorrow" dot />
        <StatCard label="Occupancy" value="86%" detail="+8.2%" positive />
        <StatCard label="Guest rating" value="4.91" detail="From 128 reviews" star />
      </View>
      <View className="mx-4 mt-6 bg-white dark:bg-[#141B2D] rounded-3xl p-5 border border-gray-200 dark:border-[#1E2A45]">
        <View className="flex-row items-center justify-between mb-2"><Text className="text-base font-bold tracking-tight text-[#111827] dark:text-white">Upcoming bookings</Text><Text className="text-xs font-semibold text-[#7C3AED] dark:text-[#8B5CF6]">View all</Text></View>
        {bookings.map((booking, i) => <View key={booking.name} className={`min-h-[70px] flex-row items-center justify-between py-3.5 ${i < 2 ? 'border-b border-gray-100 dark:border-[#1E2A45]' : ''}`}>
          <View className="flex-row items-center flex-1 min-w-0"><View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${booking.avatar}`}><Text className={`text-sm font-semibold ${booking.avatarText}`}>{booking.initials}</Text></View><View className="flex-1 min-w-0"><Text numberOfLines={1} className="text-[13px] font-bold text-gray-900 dark:text-white">{booking.name}</Text><Text numberOfLines={1} className="text-[11px] mt-0.5 text-gray-500 dark:text-[#94A3B8]">{booking.home}</Text></View></View>
          <View className="items-end ml-2"><Text className="text-xs font-medium text-gray-900 dark:text-[#F1F5F9]">{booking.dates}</Text><View className={`mt-1 px-2.5 py-0.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-emerald-50 dark:bg-[#064E3B]' : 'bg-purple-50 dark:bg-[#1E2A45]'}`}><Text className={`text-[10px] font-semibold ${booking.status === 'Confirmed' ? 'text-emerald-700 dark:text-[#4ADE80]' : 'text-[#7C3AED] dark:text-[#C4B5FD]'}`}>{booking.status}</Text></View></View>
        </View>)}
      </View>
      <View className="mx-4 mt-6 mb-8 bg-[#0F172A] rounded-3xl p-6 border border-transparent dark:border-[#1E2A45]">
        <View className="w-9 h-9 rounded-full bg-white/10 items-center justify-center"><Feather name="bell" size={16} color="#E2E8F0" /></View>
        <Text className="text-2xl leading-[30px] font-bold text-white mt-4">Stay on top of every arrival.</Text>
        <Text className="text-sm leading-[21px] text-[#94A3B8] mt-2">Guests receive automatic email and SMS confirmations before check-in.</Text>
        <Text className="text-sm font-bold text-[#A78BFA] mt-4">Manage notifications →</Text>
      </View>
    </ScrollView>
    <View className="absolute bottom-4 self-center w-[calc(100%-32px)] max-w-[358px] h-16 rounded-[32px] bg-white dark:bg-[#141B2D] border border-gray-200 dark:border-[#1E2A45] shadow-lg flex-row items-center justify-around px-2">
      <View className="flex-row items-center gap-1.5 bg-[#EDE9FE] dark:bg-[#1E2A45] px-3 py-1.5 rounded-full"><Feather name="home" size={16} color={isDark ? '#8B5CF6' : '#7C3AED'} /><Text className="text-xs font-bold text-[#7C3AED] dark:text-[#C4B5FD]">Dashboard</Text></View>
      <View className="items-center justify-center gap-0.5 px-3 py-1.5"><Feather name="file-text" size={18} color={isDark ? '#94A3B8' : '#6B7280'} /><Text className="text-xs font-medium text-gray-500 dark:text-[#94A3B8]">Listings</Text></View>
      <View className="items-center justify-center gap-0.5 px-3 py-1.5"><Feather name="calendar" size={18} color={isDark ? '#94A3B8' : '#6B7280'} /><Text className="text-xs font-medium text-gray-500 dark:text-[#94A3B8]">Bookings</Text></View>
    </View>
  </SafeAreaView>;
}
