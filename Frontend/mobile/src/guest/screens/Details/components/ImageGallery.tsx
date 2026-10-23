import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const listingImages = [
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85',
];

export default function ImageGallery({ onOpen }: { onOpen: () => void }) {
  return (
    <View className="mx-4 h-[240px] flex-row gap-2">
      <TouchableOpacity onPress={onOpen} activeOpacity={0.9} className="h-full flex-[2]"><Image source={{ uri: listingImages[0] }} accessibilityLabel="Lavender House bedroom" resizeMode="cover" className="h-full w-full rounded-2xl" /></TouchableOpacity>
      <View className="flex-1 gap-2">
        <TouchableOpacity onPress={onOpen} activeOpacity={0.9}><Image source={{ uri: listingImages[1] }} accessibilityLabel="Bathroom interior" resizeMode="cover" className="h-[116px] w-full rounded-2xl" /></TouchableOpacity>
        <View className="relative h-[116px] overflow-hidden rounded-2xl">
          <Image source={{ uri: listingImages[2] }} accessibilityLabel="Living area" resizeMode="cover" className="h-full w-full" />
          <TouchableOpacity onPress={onOpen} accessibilityRole="button" accessibilityLabel="View all photos" className="absolute inset-0 items-center justify-center rounded-2xl bg-black/50">
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
