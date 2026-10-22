import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGuestTheme } from '../../theme/ThemeContext';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85';
const HOST_IMAGE = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85';
const mockData = [
  { id: 'olive-bower', name: 'The Olive Bower', place: 'Cotswolds, UK', price: '$185', rating: '4.96', label: 'Private garden', isFavorite: true, image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=85' },
  { id: 'cliffside-haven', name: 'Cliffside Haven', place: 'Big Sur, CA', price: '$240', rating: '4.98', label: 'Ocean view', isFavorite: true, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85' },
  { id: 'nordic-pine-loft', name: 'Nordic Pine Loft', place: 'Telemark, Norway', price: '$165', rating: '4.92', label: 'Wood stove', isFavorite: false, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85' },
  { id: 'terra-cotta-suite', name: 'Terra Cotta Suite', place: 'Tuscany, Italy', price: '$210', rating: '4.95', label: 'Courtyard', isFavorite: false, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85' },
];

function Icon({ ios, android, color = '#7C3AED', size = 18 }) {
  return <SymbolView name={{ ios, android, web: android }} tintColor={color} size={size} />;
}

function Header({ isDark, toggleTheme }) {
  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED]"><Icon ios="house.fill" android="roofing" color="#FFFFFF" /></View>
        <Text className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">StayHaven</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={toggleTheme} accessibilityRole="button" accessibilityLabel="Toggle dark mode" className="h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <Icon ios={isDark ? 'sun.max' : 'moon'} android={isDark ? 'light_mode' : 'dark_mode'} color={isDark ? '#FFFFFF' : '#374151'} />
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" className="rounded-full border border-gray-200 bg-white px-3 py-1.5 dark:border-[#1E2A45] dark:bg-[#141B2D]"><Text className="text-xs font-semibold text-violet-700 dark:text-white">Sign in</Text></TouchableOpacity>
        <View className="h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]"><Icon ios="person.fill" android="person" color="#FFFFFF" /></View>
      </View>
    </View>
  );
}

function ListingCard({ item, onToggleFavorite }) {
  return (
    <TouchableOpacity activeOpacity={0.92} className="mb-6 flex-1">
      <View className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <Image source={{ uri: item.image }} accessibilityLabel={item.name} resizeMode="cover" className="w-full aspect-[4/3] rounded-2xl" />
        <View className="absolute bottom-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-1"><Text className="text-xs font-medium text-white">{item.label}</Text></View>
        <TouchableOpacity onPress={() => onToggleFavorite(item.id)} accessibilityRole="button" accessibilityLabel={item.isFavorite ? 'Remove from favorites' : 'Save to favorites'} className="absolute right-2.5 top-2.5 h-8 w-8 items-center justify-center rounded-full bg-black/60"><Ionicons name={item.isFavorite ? 'heart' : 'heart-outline'} color={item.isFavorite ? '#A78BFA' : '#FFFFFF'} size={17} /></TouchableOpacity>
      </View>
      <View className="mt-2.5">
        <View className="flex-row items-center justify-between"><Text numberOfLines={1} className="flex-1 text-base font-bold text-gray-900 dark:text-white">{item.name}</Text><View className="ml-1 flex-row items-center"><Icon ios="star.fill" android="star" size={15} /><Text className="ml-1 text-sm font-bold text-gray-900 dark:text-white">{item.rating}</Text></View></View>
        <Text numberOfLines={1} className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">{item.place}</Text>
        <Text className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{item.price} <Text className="font-normal text-gray-500 dark:text-slate-400">/ night</Text></Text>
      </View>
    </TouchableOpacity>
  );
}

function Hero() {
  return (
    <View className="mt-3 px-4">
      <ImageBackground source={{ uri: HERO_IMAGE }} accessibilityLabel="Artisanal guesthouse bedroom" resizeMode="cover" className="h-[360px] w-full overflow-hidden rounded-3xl">
        <View pointerEvents="none" className="absolute inset-0 bg-black/40" />
        <View className="flex-1 items-center justify-center px-4">
          <Text numberOfLines={1} className="mb-3 rounded-full bg-black/45 px-3 py-1 text-center text-[11px] font-semibold tracking-wider text-white">STAY SOMEWHERE MEMORABLE</Text>
          <Text className="max-w-[280px] text-center text-[32px] font-bold leading-tight tracking-tight text-white">Find a place that feels like yours.</Text>
          <Text className="mt-2 max-w-[280px] text-center text-sm text-gray-200">Thoughtful guesthouses, local hosts and stays worth remembering.</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const AREAS = ['Kampala', 'Jinja', 'Entebbe', 'Fort Portal'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date) {
  return `${String(date.getDate()).padStart(2, '0')} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function SearchPanel() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [location, setLocation] = useState('All destinations');
  const [checkIn, setCheckIn] = useState('Select a date');
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarCells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (calendarCells.length % 7) calendarCells.push(null);
  const selectDate = (day) => {
    if (!day) return;
    setCheckIn(formatDate(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day)));
    setIsCalendarModalOpen(false);
  };
  return (
    <View className="z-10 mx-4 -mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <TouchableOpacity onPress={() => setIsLocationModalOpen(true)} accessibilityRole="button" className="flex-row items-center justify-between py-1.5"><View className="flex-row items-center gap-3"><View className="h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-[#1E2A45]"><Icon ios="location.fill" android="near_me" /></View><View><Text className="text-[13px] font-bold text-gray-950 dark:text-white">Location</Text><Text className="text-[13px] text-gray-500 dark:text-[#94A3B8]">{location}</Text></View></View><Icon ios="chevron.right" android="chevron_right" color="#9CA3AF" size={20} /></TouchableOpacity>
      <View className="my-2 h-px bg-gray-100 dark:bg-[#1E2A45]" />
      <TouchableOpacity onPress={() => setIsCalendarModalOpen(true)} accessibilityRole="button" className="flex-row items-center justify-between py-1.5"><View className="flex-row items-center gap-3"><View className="h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-[#1E2A45]"><Icon ios="calendar" android="calendar_today" /></View><View><Text className="text-[13px] font-bold text-gray-950 dark:text-white">Check-in date</Text><Text className="text-[13px] text-gray-500 dark:text-[#94A3B8]">{checkIn}</Text></View></View><Icon ios="chevron.down" android="expand_more" color="#9CA3AF" size={20} /></TouchableOpacity>
      <TouchableOpacity onPress={() => { console.log('Explore search:', { location, checkIn }); setIsLocationModalOpen(false); setIsCalendarModalOpen(false); }} accessibilityRole="button" className="mt-3 w-full flex-row items-center justify-center gap-2 rounded-full bg-[#7C3AED] py-3.5"><Ionicons name="search" color="#FFFFFF" size={18} /><Text className="text-sm font-semibold text-white">Search</Text></TouchableOpacity>

      <Modal visible={isLocationModalOpen} transparent animationType="fade" onRequestClose={() => setIsLocationModalOpen(false)}>
        <View className="flex-1 justify-end bg-black/50"><View className="rounded-t-3xl bg-white p-5 dark:bg-[#141B2D]"><View className="mb-4 flex-row items-center justify-between"><Text className="text-lg font-bold text-gray-950 dark:text-white">Choose an area</Text><TouchableOpacity onPress={() => setIsLocationModalOpen(false)}><Ionicons name="close" size={24} color="#94A3B8" /></TouchableOpacity></View>{AREAS.map((area) => <TouchableOpacity key={area} onPress={() => { setLocation(area); setIsLocationModalOpen(false); }} className="border-t border-gray-100 py-4 dark:border-[#1E2A45]"><Text className="text-base text-gray-900 dark:text-white">{area}</Text></TouchableOpacity>)}</View></View>
      </Modal>
      <Modal visible={isCalendarModalOpen} transparent animationType="fade" onRequestClose={() => setIsCalendarModalOpen(false)}>
        <View className="flex-1 justify-center bg-black/50 px-5"><View className="rounded-3xl bg-white p-5 dark:bg-[#141B2D]"><View className="mb-5 flex-row items-center justify-between"><TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}><Ionicons name="chevron-back" size={22} color="#7C3AED" /></TouchableOpacity><Text className="text-base font-bold text-gray-950 dark:text-white">{calendarMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</Text><TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}><Ionicons name="chevron-forward" size={22} color="#7C3AED" /></TouchableOpacity></View><View className="mb-2 flex-row">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <Text key={`${day}-${i}`} className="w-[14.28%] text-center text-xs font-semibold text-gray-500 dark:text-[#94A3B8]">{day}</Text>)}</View><ScrollView className="max-h-64"><View className="flex-row flex-wrap">{calendarCells.map((day, index) => <TouchableOpacity key={index} disabled={!day} onPress={() => selectDate(day)} className="h-10 w-[14.28%] items-center justify-center"><Text className={`text-sm ${day ? 'text-gray-900 dark:text-white' : ''}`}>{day ?? ''}</Text></TouchableOpacity>)}</View></ScrollView><TouchableOpacity onPress={() => setIsCalendarModalOpen(false)} className="mt-4 items-center rounded-full bg-violet-100 py-3 dark:bg-[#1E2A45]"><Text className="font-semibold text-violet-700 dark:text-[#A78BFA]">Cancel</Text></TouchableOpacity></View></View>
      </Modal>
    </View>
  );
}

function ListingsHeading({ showFavorites, onToggleFavorites, count }) {
  return (
    <View className="px-4 pt-6">
      <Text className="text-xs font-bold tracking-wider text-[#7C3AED] dark:text-violet-300">HANDPICKED FOR YOU</Text>
      <Text className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">Stays with a little soul</Text>
      <View className="mb-5 mt-3 flex-row items-center justify-between"><TouchableOpacity onPress={onToggleFavorites} accessibilityRole="button" accessibilityState={{ selected: showFavorites }} className={`flex-row items-center gap-1.5 rounded-full px-3 py-1.5 ${showFavorites ? 'bg-violet-600' : 'bg-violet-100 dark:bg-[#1E2A45]'}`}><Icon ios="heart.fill" android="favorite" color={showFavorites ? '#FFFFFF' : undefined} size={14} /><Text className={`text-xs font-semibold ${showFavorites ? 'text-white' : 'text-violet-700 dark:text-white'}`}>Favorites</Text></TouchableOpacity><Text className="text-[13px] text-gray-500 dark:text-[#94A3B8]">{count} homes</Text></View>
    </View>
  );
}

function HostCta() {
  return (
    <View className="mx-4 mb-4 mt-2 overflow-hidden rounded-3xl bg-violet-50 dark:border dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <View className="flex-col p-6">
        <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#7C3AED]"><Icon ios="house.fill" android="roofing" color="#FFFFFF" size={24} /></View>
        <Text className="mt-4 text-[32px] font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white">Have a place worth sharing?</Text>
        <Text className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-[#94A3B8]">Join a thoughtful community of hosts. We make listing simple and help you manage every stay.</Text>
        <TouchableOpacity onPress={() => router.push('/register')} accessibilityRole="button" className="mt-4 self-start rounded-full bg-slate-900 px-6 py-3 dark:bg-[#0A0E1A]"><Text className="text-sm font-medium text-white">Start hosting →</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')} accessibilityRole="button" className="mt-3"><Text className="text-sm font-medium text-[#7C3AED]">Want to list with us?</Text></TouchableOpacity>
      </View>
      <Image source={{ uri: HOST_IMAGE }} accessibilityLabel="Guesthouse bedroom" resizeMode="cover" className="h-48 w-full" />
    </View>
  );
}

export default function ExploreScreen() {
  const { isDark, toggleTheme } = useGuestTheme();
  const [showFavorites, setShowFavorites] = useState(false);
  const [listings, setListings] = useState(mockData);
  const visibleListings = showFavorites ? listings.filter((item) => item.isFavorite === true) : listings;
  const toggleFavorite = (id) => setListings((current) => current.map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] dark:bg-[#0A0E1A]">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <FlatList
        className="flex-1"
        data={visibleListings}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 24, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<><Hero /><SearchPanel /><ListingsHeading showFavorites={showFavorites} onToggleFavorites={() => setShowFavorites((current) => !current)} count={visibleListings.length} /></>}
        renderItem={({ item }) => <ListingCard item={item} onToggleFavorite={toggleFavorite} />}
        ListFooterComponent={<HostCta />}
      />
    </SafeAreaView>
  );
}
