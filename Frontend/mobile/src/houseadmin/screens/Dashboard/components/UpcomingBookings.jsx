import { StyleSheet, Text, View } from 'react-native';

const bookings = [
  { initials: 'SC', name: 'Sophie Chen', home: 'Cedar Haven Cottage', dates: 'Oct 18–22', status: 'Confirmed', tone: 'purple' },
  { initials: 'MK', name: 'Marcus Kelly', home: 'Hilltop Modern Villa', dates: 'Oct 24–28', status: 'Checked in', tone: 'amber' },
  { initials: 'EJ', name: 'Elena & Julian', home: 'Lakeside Pine Retreat', dates: 'Nov 2–7', status: 'Confirmed', tone: 'blue' },
];
const tones = { purple: ['#F3E8FF', '#7C3AED'], amber: ['#FEF3C7', '#D97706'], blue: ['#DBEAFE', '#2563EB'] };

export default function UpcomingBookings({ theme }) {
  return <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
    <View style={styles.heading}><Text style={[styles.title, { color: theme.text }]}>Upcoming bookings</Text><Text style={[styles.link, { color: theme.purple }]}>View all</Text></View>
    {bookings.map((booking, index) => <View key={booking.name} style={[styles.row, index < bookings.length - 1 && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth }]}>
      <View style={styles.person}><View style={[styles.initials, { backgroundColor: tones[booking.tone][0] }]}><Text style={{ color: tones[booking.tone][1], fontSize: 13, fontWeight: '600' }}>{booking.initials}</Text></View><View style={styles.details}><Text numberOfLines={1} style={[styles.name, { color: theme.text }]}>{booking.name}</Text><Text numberOfLines={1} style={[styles.home, { color: theme.secondary }]}>{booking.home}</Text></View></View>
      <View style={styles.date}><Text style={[styles.dateText, { color: theme.text }]}>{booking.dates}</Text><View style={[styles.badge, { backgroundColor: booking.status === 'Confirmed' ? theme.confirmBg : theme.purpleTint }]}><Text style={{ color: booking.status === 'Confirmed' ? theme.green : theme.purple, fontSize: 10, fontWeight: '600' }}>{booking.status}</Text></View></View>
    </View>)}
  </View>;
}

const styles = StyleSheet.create({ card: { marginHorizontal: 16, marginTop: 24, padding: 20, borderRadius: 24, borderWidth: 1 }, heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }, title: { fontSize: 16, fontWeight: '700', letterSpacing: -0.2 }, link: { fontSize: 12, fontWeight: '600' }, row: { minHeight: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }, person: { flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }, initials: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, details: { flex: 1, minWidth: 0, gap: 3 }, name: { fontSize: 13, fontWeight: '700' }, home: { fontSize: 11 }, date: { alignItems: 'flex-end', marginLeft: 8 }, dateText: { fontSize: 11, fontWeight: '500' }, badge: { marginTop: 5, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 3 } });
