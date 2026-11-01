import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CalendarGrid from '../../components/CalendarGrid';
import { mockData } from '../Explore/listings';
import BookingCard, { type Booking } from './BookingCard';

const makeBookings = (type: Booking['type'], listings: typeof mockData, dateRanges: [number, number, number, number, number, number][]) => listings.map((listing, index) => {
  const [checkInYear, checkInMonth, checkInDay, checkOutYear, checkOutMonth, checkOutDay] = dateRanges[index];
  const checkIn = new Date(checkInYear, checkInMonth - 1, checkInDay);
  const checkOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return {
    ...listing,
    bookingId: `${listing.id}-${checkIn.toISOString().slice(0, 10)}`,
    checkIn,
    checkOut,
    nights,
    dates: `${checkIn.toLocaleDateString('en', { month: 'short', day: '2-digit' })}–${checkOut.toLocaleDateString('en', { day: '2-digit', year: 'numeric' })}`,
    room: type === 'current' ? ['King Suite', 'River View', 'Entire Cottage', 'Garden Room'][index] : 'Guest Suite',
    status: type === 'past' ? 'Completed' : 'Confirmed',
    type,
  } as Booking;
});

const currentBookings: Booking[] = makeBookings('current', mockData.slice(0, 4), [
  [2026, 11, 12, 2026, 11, 15],
  [2026, 12, 2, 2026, 12, 6],
  [2027, 1, 14, 2027, 1, 18],
  [2027, 2, 22, 2027, 2, 27],
]);
const pastBookings: Booking[] = makeBookings('past', mockData.slice(4, 6), [
  [2025, 1, 14, 2025, 1, 19],
  [2025, 11, 2, 2025, 11, 7],
]);

const formatDate = (date: Date) => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
const dateOnly = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<Booking['type']>('current');
  const [bookings, setBookings] = useState<Booking[]>(currentBookings);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const bookingsForTab = activeTab === 'current' ? bookings : pastBookings;
  const filteredBookings = useMemo(() => bookingsForTab.filter((booking) =>
    !filterDate || dateOnly(booking.checkIn) >= dateOnly(filterDate),
  ), [activeTab, bookings, filterDate]);
  const handleCancel = (id: string) => setBookings((prevBookings) => prevBookings.filter((b) => b.id !== id));
  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const selectFilterDate = (date: Date) => {
    setFilterDate(date);
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] px-4 dark:bg-[#0A0E1A]">
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <View className="pt-8"><Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">YOUR STAYS</Text><Text className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Bookings</Text><Text className="mt-2 text-sm text-gray-500 dark:text-[#94A3B8]">Your upcoming and previous Botswana stays.</Text></View>
        <View className="mt-6 flex-row items-center justify-between gap-3">
          <View className="flex-row rounded-full bg-violet-100 p-1 dark:bg-[#171B28]">{(['current', 'past'] as const).map((tab) => <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 ${activeTab === tab ? 'bg-white dark:bg-[#262A37]' : ''}`}><Text className={`text-sm font-semibold capitalize ${activeTab === tab ? 'text-[#7C3AED] dark:text-[#D0BCFF]' : 'text-gray-500 dark:text-[#94A3B8]'}`}>{tab}</Text></TouchableOpacity>)}</View>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={openDatePicker}
              accessibilityRole="button"
              accessibilityLabel={filterDate ? `Filter bookings from ${formatDate(filterDate)}` : 'Filter bookings by date'}
              className="h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow-sm dark:border-[#1E2A45] dark:bg-[#171B28]"
            >
              <Ionicons name="filter" size={18} color="#7C3AED" />
            </TouchableOpacity>
            {filterDate && (
              <View className="flex-row items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1.5 dark:bg-[#1E2A45]">
                <Text className="text-xs font-semibold text-violet-700 dark:text-[#D0BCFF]">
                  {filterDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={() => setFilterDate(null)} accessibilityRole="button" accessibilityLabel="Clear date filter">
                  <Ionicons name="close-circle" size={16} color="#7C3AED" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View className="mt-5 gap-4">
          {filteredBookings.map((booking) => <BookingCard key={booking.bookingId} booking={booking} onCancel={handleCancel} />)}
          {filteredBookings.length === 0 && <View className="rounded-2xl border border-dashed border-gray-300 p-8 dark:border-[#334155]"><Text className="text-center text-sm text-gray-500 dark:text-[#94A3B8]">No bookings match the selected date.</Text></View>}
        </View>
      </ScrollView>
      <Modal visible={showDatePicker} transparent animationType="fade" onRequestClose={() => setShowDatePicker(false)}>
        <View className="flex-1 items-center justify-center bg-black/50 px-5">
          <View className="w-full max-w-xs rounded-3xl bg-white p-5 shadow-xl dark:bg-[#141B2D]">
            <CalendarGrid currentDate={filterDate || new Date()} selectedDate={filterDate} onSelect={selectFilterDate} />
            <TouchableOpacity onPress={() => setShowDatePicker(false)} className="mt-4 w-full items-center rounded-full bg-violet-100 py-3 dark:bg-[#1E2A45]">
              <Text className="font-semibold text-violet-700 dark:text-[#A78BFA]">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
