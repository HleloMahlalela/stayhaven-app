import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../guest/screens/Explore/ExploreScreen';
import BookingsScreen from '../guest/screens/Bookings';
import ReviewsScreen from '../guest/screens/Reviews';
import { useGuestTheme } from '../guest/theme/ThemeContext';

const Tab = createBottomTabNavigator();
const tabIcons = {
  Explore: 'compass-outline',
  Bookings: 'calendar-outline',
  Reviews: 'star-outline',
};

function FloatingTabBar({ state, descriptors, navigation }) {
  const { isDark } = useGuestTheme();
  return (
    <View className={`absolute bottom-4 left-4 right-4 h-16 flex-row items-center justify-around rounded-[32px] border px-3 shadow-xl ${isDark ? 'border-[#1E2A45] bg-[#141B2D]' : 'border-[#E5E7EB] bg-white'}`}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const label = descriptors[route.key].options.tabBarLabel ?? route.name;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        const active = focused ? (isDark ? 'bg-[#1E2A45]' : 'bg-[#EDE9FE]') : '';
        const tint = focused ? (isDark ? '#A78BFA' : '#7C3AED') : (isDark ? '#94A3B8' : '#6B7280');
        return (
          <TouchableOpacity key={route.key} onPress={onPress} accessibilityRole="button" accessibilityState={focused ? { selected: true } : {}} className={`${focused ? 'flex-row gap-2 px-4 py-2' : 'flex-col gap-0.5 px-3 py-1'} items-center justify-center rounded-full ${active}`}>
            <Ionicons name={tabIcons[route.name]} color={tint} size={20} />
            <Text className={`text-xs ${focused ? 'font-semibold' : 'font-medium'}`} style={{ color: tint }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function GuestTabNavigator() {
  const { isDark } = useGuestTheme();
  return (
    <Tab.Navigator tabBar={(props) => <FloatingTabBar {...props} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: isDark ? '#0A0E1A' : '#F8F9FA' } }}>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Reviews" component={ReviewsScreen} />
    </Tab.Navigator>
  );
}
