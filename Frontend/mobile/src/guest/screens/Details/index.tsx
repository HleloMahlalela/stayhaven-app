import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CalendarGrid from '../../components/CalendarGrid';
import ImageGallery from './components/ImageGallery';
import AmenitiesGrid from './components/AmenitiesGrid';
import BookingCard from './components/BookingCard';
import api, { getImageUrl } from '../../../services/api';

const tomorrow = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);
  return date;
};

function ModalFrame({ visible, onClose, children, fullScreen = false }: { visible: boolean; onClose: () => void; children: React.ReactNode; fullScreen?: boolean }) {
  return <Modal visible={visible} animationType="slide" transparent={!fullScreen} onRequestClose={onClose}>
    <View className={`flex-1 ${fullScreen ? 'bg-[#F8F9FA] dark:bg-[#0A0E1A]' : 'justify-end bg-black/50'}`}>
      <View className={`${fullScreen ? 'flex-1' : 'rounded-t-3xl bg-white p-5 dark:bg-[#141B2D]'}`}>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">{fullScreen ? 'Photos' : ''}</Text>
          <TouchableOpacity onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" className={`h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45] ${fullScreen ? 'mt-8 min-h-[44px] min-w-[44px]' : ''}`}><Ionicons name="close" size={22} color="#94A3B8" /></TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  </Modal>;
}

export default function DetailsScreen() {
  const router = useRouter();
  const { id, listingData } = useLocalSearchParams<{ id?: string | string[]; listingData?: string | string[] }>();
  const serializedListing = Array.isArray(listingData) ? listingData[0] : listingData;
  const listingId = Array.isArray(id) ? id[0] : id;
  let routeListing: any;
  try {
    routeListing = serializedListing ? JSON.parse(serializedListing) : undefined;
  } catch {
    routeListing = undefined;
  }
  const [listing, setListing] = useState<any>(routeListing ? { ...routeListing, title: routeListing.title ?? routeListing.name, image: routeListing.images?.[0] ?? '', hostName: routeListing.hostName ?? routeListing.host?.fullName ?? routeListing.houselisterId?.fullName ?? '' } : null);
  const [listingError, setListingError] = useState('');
  useEffect(() => { if (!routeListing && listingId) api.get<any>(`/listings/${listingId}`).then(({ data }) => setListing({ ...data, title: data.title, image: data.images?.[0] ?? '', hostName: data.host?.fullName ?? data.houselisterId?.fullName ?? '' })).catch(() => setListingError('Unable to load this listing.')); }, [listingId, serializedListing]);
  const galleryImages = Array.isArray(listing?.images) ? listing.images : [];
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => { scrollRef.current?.scrollTo({ y: 0, animated: false }); }, []);
  const [isFavorite, setIsFavorite] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatThreadId, setChatThreadId] = useState('');
  const [chatMessages, setChatMessages] = useState<{ _id: string; body: string }[]>([]);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [dateTarget, setDateTarget] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [message, setMessage] = useState('');
  const firstAvailableDate = tomorrow();
  const minimumDate = dateTarget === 'checkOut' && checkIn
    ? new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + 1)
    : firstAvailableDate;
  const selectedCalendarDate = dateTarget === 'checkIn' ? checkIn : checkOut;
  const chooseDate = (date: Date) => {
    if (dateTarget === 'checkIn') {
      setCheckIn(date);
      if (checkOut && date >= checkOut) setCheckOut(null);
    } else {
      setCheckOut(date);
    }
    setCalendarOpen(false);
  };

  const reserve = async (totalPrice: number) => {
    if (!checkIn || !checkOut) {
      Alert.alert('Choose your dates', 'Select check-in and check-out dates before reserving.');
      return;
    }
    try {
      await api.post('/bookings', {
        listing: listing._id || listing.id || listingId,
        checkInDate: checkIn.toISOString(),
        checkOutDate: checkOut.toISOString(),
        guests,
        totalPrice,
      });
      Alert.alert('Booking Confirmed', 'Your stay has been reserved.');
      router.push('/bookings');
    } catch (error: any) {
      Alert.alert('Unable to book', error?.message || 'Please try again.');
    }
  };

  if (!listing) return <SafeAreaView className="flex-1 items-center justify-center bg-[#F8F9FA] px-6 dark:bg-[#0A0E1A]"><Text className="text-center text-gray-600 dark:text-white">{listingError || 'Loading listing…'}</Text></SafeAreaView>;

  const openChat = async () => {
    try {
      const { data: thread } = await api.post<{ _id: string }>('/messages/threads', { listingId: listing._id || listing.id || listingId });
      const { data } = await api.get<{ messages: { _id: string; body: string }[] }>(`/messages/threads/${thread._id}`);
      setChatThreadId(thread._id);
      setChatMessages(data.messages || []);
      setChatOpen(true);
    } catch (error) {
      Alert.alert('Unable to message host', error instanceof Error ? error.message : 'Please sign in and try again.');
    }
  };
  const sendChat = async () => {
    if (!message.trim() || !chatThreadId) return;
    try {
      const { data } = await api.post<{ _id: string; body: string }>(`/messages/threads/${chatThreadId}/messages`, { body: message.trim() });
      setChatMessages((current) => [...current, data]);
      setMessage('');
    } catch (error) {
      Alert.alert('Unable to send', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] dark:bg-[#0A0E1A]">
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mb-2 flex-row items-center justify-between px-4 pb-2 pt-2">
          <TouchableOpacity onPress={() => { if (router.canGoBack()) router.back(); else router.replace('/'); }} accessibilityRole="button" accessibilityLabel="Close details" className="h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]"><Ionicons name="close" size={20} color="#64748B" /></TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(value => !value)} accessibilityRole="button" accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Save to favorites'} className="h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]"><Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color={isFavorite ? '#7C3AED' : '#64748B'} /></TouchableOpacity>
        </View>
        <ImageGallery onOpen={() => setGalleryOpen(true)} images={galleryImages} />
        <View className="mt-4 px-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">{listing.title}</Text>
          <View className="mt-1 flex-row items-center gap-1.5"><Ionicons name="location" size={16} color="#7C3AED" /><Text className="text-sm text-gray-500 dark:text-[#94A3B8]">{listing.location}</Text></View>
          <View className="my-4 h-px bg-gray-200 dark:bg-[#1E2A45]" />
          <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">4 guests · 2 beds · 1 private bathroom</Text>
        </View>
        <View className="mt-4 px-4"><Text className="mb-2 text-lg font-bold text-gray-900 dark:text-white">About this guesthouse</Text><Text className="text-sm leading-relaxed text-gray-600 dark:text-[#CBD5E1]">{listing.description}</Text></View>
        <AmenitiesGrid amenities={listing.amenities ?? []} />
        <View className="mx-4 mt-6 flex-row items-center gap-3 rounded-2xl bg-violet-50 p-4 dark:border dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-[#7C3AED]"><Text className="text-sm font-bold text-white">{listing.hostName.slice(0, 1)}N</Text></View>
          <View className="flex-1"><Text className="font-bold leading-tight text-gray-900 dark:text-white">Hosted by {listing.hostName}</Text><Text className="mt-0.5 text-[13px] text-gray-500 dark:text-[#94A3B8]">Responds within an hour</Text></View>
          <TouchableOpacity onPress={() => router.push({ pathname: '/messages', params: { listingId: listing._id || listing.id || listingId } })} accessibilityRole="button" className="rounded-full bg-[#7C3AED] px-3 py-2"><Text className="text-xs font-semibold text-white">Contact host</Text></TouchableOpacity>
        </View>
        <BookingCard price={listing.price} discount={listing.discount} discountInterval={listing.discountInterval} checkIn={checkIn} checkOut={checkOut} guests={guests} onChooseCheckIn={() => { setDateTarget('checkIn'); setCalendarOpen(true); }} onChooseCheckOut={() => { setDateTarget('checkOut'); setCalendarOpen(true); }} onChooseGuests={() => setGuestsOpen(true)} onReserve={reserve} />
      </ScrollView>

      <ModalFrame visible={galleryOpen} onClose={() => setGalleryOpen(false)} fullScreen>
        <FlatList data={galleryImages} horizontal pagingEnabled showsHorizontalScrollIndicator={false} keyExtractor={(item) => item} renderItem={({ item }) => <View className="h-full w-screen items-center justify-center"><Image source={{ uri: getImageUrl(item) }} resizeMode="contain" className="h-[75%] w-full" /></View>} />
      </ModalFrame>
      <ModalFrame visible={calendarOpen} onClose={() => setCalendarOpen(false)}>
        <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">Select {dateTarget === 'checkIn' ? 'check-in' : 'check-out'} date</Text>
        <CalendarGrid currentDate={selectedCalendarDate || minimumDate} selectedDate={selectedCalendarDate} minimumDate={minimumDate} onSelect={chooseDate} />
      </ModalFrame>
      <ModalFrame visible={guestsOpen} onClose={() => setGuestsOpen(false)}>
        <Text className="mb-6 text-base font-semibold text-gray-900 dark:text-white">Guests</Text>
        <View className="mb-6 flex-row items-center justify-center gap-8">
          <TouchableOpacity onPress={() => setGuests(count => Math.max(1, count - 1))} accessibilityRole="button" accessibilityLabel="Remove guest" className="h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-[#334155]"><Ionicons name="remove" size={22} color="#7C3AED" /></TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">{guests}</Text>
          <TouchableOpacity onPress={() => setGuests(count => Math.min(16, count + 1))} accessibilityRole="button" accessibilityLabel="Add guest" className="h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-[#334155]"><Ionicons name="add" size={22} color="#7C3AED" /></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setGuestsOpen(false)} className="items-center rounded-full bg-[#7C3AED] py-3"><Text className="font-semibold text-white">Done</Text></TouchableOpacity>
      </ModalFrame>
      <ModalFrame visible={chatOpen} onClose={() => setChatOpen(false)}>
        <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">Message {listing.hostName}</Text>
        <ScrollView className="mb-4 h-48 rounded-xl bg-gray-50 p-3 dark:bg-[#0A0E1A]">{chatMessages.map((item) => <Text key={item._id} className="mb-2 rounded-lg bg-violet-100 p-2 text-sm text-gray-900 dark:bg-[#2A1F4E] dark:text-white">{item.body}</Text>)}</ScrollView>
        <View className="flex-row items-center gap-2">
          <TextInput value={message} onChangeText={setMessage} placeholder="Write a message..." placeholderTextColor="#94A3B8" className="min-h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white" />
          <TouchableOpacity onPress={sendChat} accessibilityRole="button" accessibilityLabel="Send message" className="h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED]"><Ionicons name="send" size={18} color="white" /></TouchableOpacity>
        </View>
      </ModalFrame>
    </SafeAreaView>
  );
}
