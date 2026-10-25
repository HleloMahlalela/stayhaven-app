import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGuestTheme } from '@/guest/theme/ThemeContext';
import HouseAdminBottomNav from '../../components/HouseAdminBottomNav';
import HouseAdminHeader from '../../components/HouseAdminHeader';
import BookingCard, { type Booking } from './components/BookingCard';

const bookings: Booking[] = [
  { initials: 'SC', name: 'Sophie Chen', property: 'Cedar Haven Cottage', dates: 'Oct 18\u201322', status: 'Confirmed', tone: 'sophie' },
  { initials: 'MK', name: 'Marcus Kelly', property: 'Hilltop Modern Villa', dates: 'Oct 24\u201328', status: 'Checked in', tone: 'marcus' },
  { initials: 'EJ', name: 'Elena & Julian', property: 'Lakeside Pine Retreat', dates: 'Nov 2\u20137', status: 'Confirmed', tone: 'elena' },
];

export default function BookingsScreen() {
  const { isDark, toggleTheme } = useGuestTheme();
  return <SafeAreaView edges={['top']} className="max-w-[390px] w-full flex-1 self-center bg-[#F8F9FA] dark:bg-[#0A0E1A]">
    <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
    <HouseAdminHeader dark={isDark} toggleTheme={toggleTheme} />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
      <View className="mx-4 mt-6">
        <Text className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</Text>
        <Text className="mt-1 text-[28px] leading-[34px] font-bold text-[#111827] dark:text-white">Booking management</Text>
        <Text className="mt-1 text-sm text-[#6B7280] dark:text-[#94A3B8]">Manage upcoming stays and guest requests.</Text>
      </View>
      <View className="mx-4 mt-6 mb-8 flex-col gap-4">{bookings.map((booking) => <BookingCard key={booking.name} booking={booking} dark={isDark} />)}</View>
    </ScrollView>
    <HouseAdminBottomNav dark={isDark} active="Bookings" />
  </SafeAreaView>;
}
