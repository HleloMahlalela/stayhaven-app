import { ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNavbar from '@/components/BottomNavbar';
import ArrivalNotice from './components/ArrivalNotice';
import DashboardHeader from './components/DashboardHeader';
import StatsGrid from './components/StatsGrid';
import UpcomingBookings from './components/UpcomingBookings';

const palettes = {
  light: { background: '#F8F9FA', card: '#FFFFFF', text: '#111827', secondary: '#6B7280', border: '#E5E7EB', purple: '#7C3AED', purpleTint: '#EDE9FE', green: '#059669', confirmBg: '#ECFDF5' },
  dark: { background: '#0A0E1A', card: '#141B2D', text: '#F8FAFC', secondary: '#94A3B8', border: '#1E2A45', purple: '#8B5CF6', purpleTint: '#1E2A45', green: '#4ADE80', confirmBg: '#064E3B' },
};

export default function DashboardScreen() {
  const dark = useColorScheme() === 'dark';
  const theme = palettes[dark ? 'dark' : 'light'];

  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
    <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
    <DashboardHeader theme={theme} dark={dark} />
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.intro}>
        <Text style={[styles.eyebrow, { color: theme.purple }]}>HOUSE ADMIN WORKSPACE</Text>
        <Text style={[styles.greeting, { color: theme.text }]}>Good morning, Amara.</Text>
        <Text style={[styles.subtitle, { color: theme.secondary }]}>Here's what's happening with your guesthouses.</Text>
        <View style={[styles.cta, { backgroundColor: theme.purple }]}><Text style={styles.ctaText}>＋  Request new listing</Text></View>
      </View>
      <StatsGrid theme={theme} />
      <UpcomingBookings theme={theme} />
      <ArrivalNotice />
    </ScrollView>
    <BottomNavbar theme={theme} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, width: '100%', maxWidth: 390, alignSelf: 'center' }, content: { paddingBottom: 96 }, intro: { marginHorizontal: 16, marginTop: 24 }, eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 1 }, greeting: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.5, marginTop: 4 }, subtitle: { fontSize: 14, lineHeight: 21, marginTop: 4 }, cta: { minHeight: 48, borderRadius: 28, marginTop: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#7C3AED', shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 }, ctaText: { color: '#fff', fontSize: 14, fontWeight: '600' } });
