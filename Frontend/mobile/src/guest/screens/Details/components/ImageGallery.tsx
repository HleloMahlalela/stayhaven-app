import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../../../../services/api';

export default function ImageGallery({ onOpen, images = [] }: { onOpen: () => void; images?: string[] }) {
  if (!images.length) return null;
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }} className="mx-4 h-[250px]">
    {images.map((image, index) => {
      const imageUrl = getImageUrl(image);
      console.log('Fetching Image:', getImageUrl(image));
      return <TouchableOpacity key={`${image}-${index}`} onPress={onOpen} activeOpacity={0.9} className="h-[250px] w-[320px]"><Image source={{ uri: imageUrl }} accessibilityLabel={`Property photo ${index + 1}`} resizeMode="cover" className="h-[250px] w-full rounded-2xl" /></TouchableOpacity>;
    })}
  </ScrollView>;
}
