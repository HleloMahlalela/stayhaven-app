import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function ImageGallery({ onOpen, heroImage }: { onOpen: () => void; heroImage?: string }) {
  return (
    <View className="mx-4 h-[250px] flex-row gap-2">
      {heroImage ? <TouchableOpacity onPress={onOpen} activeOpacity={0.9} className="h-full flex-[2]"><Image source={{ uri: heroImage }} accessibilityLabel="Property photo" resizeMode="cover" className="h-[250px] w-full rounded-2xl" /></TouchableOpacity> : <View className="h-full flex-[2] rounded-2xl bg-gray-100 dark:bg-gray-800" />}
    </View>
  );
}
