import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ImageGallery, { listingImages } from './components/ImageGallery';
import AmenitiesGrid from './components/AmenitiesGrid';
import BookingCard from './components/BookingCard';

const listing = {
  title: 'Lavender House', hostName: 'Amara', price: 84, location: 'Kampala, Uganda', rating: '4.92', reviews: 86,
  description: 'A carefully hosted retreat with warm interiors, peaceful shared spaces, and everything needed for a comfortable stay.',
};

function ModalFrame({ visible, onClose, children, fullScreen = false }: { visible: boolean; onClose: () => void; children: React.ReactNode; fullScreen?: boolean }) {
  return <Modal visible={visible} animationType="slide" transparent={!fullScreen} onRequestClose={onClose}>
    <View className={`flex-1 ${fullScreen ? 'bg-[#F8F9FA] dark:bg-[#0A0E1A]' : 'justify-end bg-black/50'}`}>
      <View className={`${fullScreen ? 'flex-1' : 'rounded-t-3xl bg-white p-5 dark:bg-[#141B2D]'}`}>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">{fullScreen ? 'Photos' : ''}</Text>
          <TouchableOpacity onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" className="h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45]"><Ionicons name="close" size={22} color="#94A3B8" /></TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  </Modal>;
}

export default function DetailsScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [message, setMessage] = useState('');
  const dates = useMemo(() => Array.from({ length: 30 }, (_, index) => {
    const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() + index + 1); return date;
  }), []);
  const dateLabel = (date: Date) => date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  const sendChat = () => {
    setChatOpen(false);
    Alert.alert('Message sent to host!');
    setMessage('');
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] dark:bg-[#0A0E1A]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mb-2 flex-row items-center justify-between px-4 pb-2 pt-2">
          <TouchableOpacity onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close details" className="h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]"><Ionicons name="close" size={20} color="#64748B" /></TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(value => !value)} accessibilityRole="button" accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Save to favorites'} className="h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]"><Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color={isFavorite ? '#7C3AED' : '#64748B'} /></TouchableOpacity>
        </View>
        <ImageGallery onOpen={() => setGalleryOpen(true)} />
        <View className="mt-4 px-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">{listing.title}</Text>
          <View className="mt-1 flex-row items-center gap-1.5"><Ionicons name="location" size={16} color="#7C3AED" /><Text className="text-sm text-gray-500 dark:text-[#94A3B8]">{listing.location}</Text></View>
          <View className="mt-1 flex-row items-center"><Ionicons name="star" size={16} color="#7C3AED" /><Text className="ml-1 text-sm font-bold text-gray-900 dark:text-white">{listing.rating}</Text><Text className="text-sm text-gray-500 dark:text-[#94A3B8]"> · {listing.reviews} reviews</Text></View>
          <View className="my-4 h-px bg-gray-200 dark:bg-[#1E2A45]" />
          <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">4 guests · 2 beds · 1 private bathroom</Text>
        </View>
        <View className="mt-4 px-4"><Text className="mb-2 text-lg font-bold text-gray-900 dark:text-white">About this guesthouse</Text><Text className="text-sm leading-relaxed text-gray-600 dark:text-[#CBD5E1]">{listing.description}</Text></View>
        <AmenitiesGrid />
        <TouchableOpacity onPress={() => setChatOpen(true)} accessibilityRole="button" className="mx-4 mt-6 flex-row items-center gap-3 rounded-2xl bg-violet-50 p-4 dark:border dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-[#7C3AED]"><Text className="text-sm font-bold text-white">{listing.hostName.slice(0, 1)}N</Text></View>
          <View><Text className="font-bold leading-tight text-gray-900 dark:text-white">Hosted by {listing.hostName}</Text><Text className="mt-0.5 text-[13px] text-gray-500 dark:text-[#94A3B8]">Verified host · Responds within an hour</Text></View>
        </TouchableOpacity>
        <BookingCard price={listing.price} checkIn={checkIn} guests={guests} onChooseDate={() => setCalendarOpen(true)} onChooseGuests={() => setGuestsOpen(true)} />
      </ScrollView>

      <ModalFrame visible={galleryOpen} onClose={() => setGalleryOpen(false)} fullScreen>
        <FlatList data={listingImages} horizontal pagingEnabled showsHorizontalScrollIndicator={false} keyExtractor={(item) => item} renderItem={({ item }) => <View className="h-full w-screen items-center justify-center"><Image source={{ uri: item }} resizeMode="contain" className="h-[75%] w-full" /></View>} />
      </ModalFrame>
      <ModalFrame visible={calendarOpen} onClose={() => setCalendarOpen(false)}>
        <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">Select check-in date</Text>
        <FlatList data={dates} keyExtractor={(item) => item.toISOString()} className="max-h-80" renderItem={({ item }) => <TouchableOpacity onPress={() => { setCheckIn(item); setCalendarOpen(false); }} className="border-b border-gray-100 py-3 dark:border-[#1E2A45]"><Text className="text-base text-gray-800 dark:text-white">{dateLabel(item)}</Text></TouchableOpacity>} />
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
        <View className="mb-4 h-48 rounded-xl bg-gray-50 dark:bg-[#0A0E1A]" />
        <View className="flex-row items-center gap-2">
          <TextInput value={message} onChangeText={setMessage} placeholder="Write a message..." placeholderTextColor="#94A3B8" className="min-h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white" />
          <TouchableOpacity onPress={sendChat} accessibilityRole="button" accessibilityLabel="Send message" className="h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED]"><Ionicons name="send" size={18} color="white" /></TouchableOpacity>
        </View>
      </ModalFrame>
    </SafeAreaView>
  );
}
