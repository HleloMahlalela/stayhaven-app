import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGuestTheme } from '@/guest/theme/ThemeContext';
import HouseAdminBottomNav from './components/HouseAdminBottomNav';
import HouseAdminHeader from './components/HouseAdminHeader';
import ListingCard, { type Listing } from './components/ListingCard';

const listings: Listing[] = [
  {
    title: 'Lavender House', city: 'Kampala', bookings: 14, status: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfWsWe53Vzs_aIK7HIW1p8bBHwceRxXA2CSCB1l9fWcoPaMMb8_GcmPFa4zdcT23BTUaZO11Bn6PPohDpcFf4X0IxOyefcqHbTjhPj6eKs05Ux9j_gSRl7KZ5mpVibRzjX4gFgKa1nSZZt2aVi4bGtepEr6ZDuYpI0seBA0RyaVN7FHVPOYwK-f9niKoaGpPc6-T1Srj7hXcV3JzXb9Rto2RDweRtEz7octcO9HcqGZtiJgjfguUCcfQ',
  },
  {
    title: 'The Cloud Villa', city: 'Jinja', bookings: 8, status: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuISRXmiJqYL6NchFn1SFeaQKFGRlfUj2I9lkY3MXD4uk6NAV1qc2yufdRe8YYZyDxBt7iZpdqmC32dzwFLjWB9z-qJFognWmKwdjlHjAS35h2lg46Ad2v5hGAe-svJvU-CHms8UOJBhnNBksoOck32xdec1OXG-zjOjQLuGTM0S0gaxCAXTaoyFsgP64AO4ln1x0uQfnTKJ9m5rTiwtogLFNPUQ8JhKWagFzR7_OBJlfcAd9zd-lDTA',
  },
  {
    title: 'Casa Sol', city: 'Entebbe', bookings: 11, status: 'Paused',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWLTiII8tZf-nxEKqQI3BXbkdOi7wZTD28Fj21IDqhkd_fL1ZOYfuQj1I-jbeMt4Bb3GeVNbmQ8wnKAyhUm85KpN_XAtuSKk8O6Ag-_uoXyChirL7CBE_TeyjrRptNGMrHC4U53CpGY9zVetMt6A4ooxZfPQtyFnInUaVNyTf93hbo4jSsDExpWprqzau-ePMlEQcILDn9lvO4BI30a9v6yMgmmiEOjd-wyythsxG2YDRT6n8gHhP-0A',
  },
];

export default function ListingsScreen() {
  const { isDark, toggleTheme } = useGuestTheme();

  return (
    <SafeAreaView edges={['top']} className="max-w-[390px] w-full flex-1 self-center bg-[#F8F9FA] dark:bg-[#0A0E1A]">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <HouseAdminHeader dark={isDark} toggleTheme={toggleTheme} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View className="mx-4 mt-6">
          <Text className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</Text>
          <Text className="mt-1 text-[28px] leading-[34px] font-bold text-[#111827] dark:text-white">Your listings</Text>
          <Text className="mt-1 text-sm text-[#6B7280] dark:text-[#94A3B8]">Edit, pause, or request a new guesthouse listing.</Text>
          <Pressable accessibilityRole="button" className="mt-4 w-full flex-row items-center justify-center rounded-full bg-[#7C3AED] py-3">
            <Feather name="plus" size={16} color="white" />
            <Text className="ml-1.5 text-sm font-semibold text-white">Request new listing</Text>
          </Pressable>
        </View>
        <View className="mx-4 mt-6 flex-col gap-4">
          {listings.map((listing) => <ListingCard key={listing.title} listing={listing} />)}
        </View>
      </ScrollView>
      <HouseAdminBottomNav dark={isDark} />
    </SafeAreaView>
  );
}
