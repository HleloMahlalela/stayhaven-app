import { StyleSheet, Text, View } from 'react-native';

const items = [
  { label: 'Active listings', value: '4', detail: '▲ +1 this month', positive: true },
  { label: 'Upcoming stays', value: '12', detail: '● Next: tomorrow', positive: true },
  { label: 'Occupancy', value: '86%', detail: '▲ +8.2%', positive: true },
  { label: 'Guest rating', value: '4.91', detail: 'From 128 reviews', star: true },
];

export default function StatsGrid({ theme }) {
  return <View style={styles.grid}>{items.map((item) => (
    <View key={item.label} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.secondary }]}>{item.label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{item.value}{item.star ? <Text style={styles.star}> ★</Text> : null}</Text>
      <Text numberOfLines={1} style={[styles.detail, { color: item.positive ? theme.green : theme.secondary }]}>{item.detail}</Text>
    </View>
  ))}</View>;
}

const styles = StyleSheet.create({ grid: { marginHorizontal: 16, marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { width: '48%', minHeight: 108, borderRadius: 16, padding: 16, borderWidth: 1 }, label: { fontSize: 12, fontWeight: '500' }, value: { fontSize: 24, fontWeight: '700', marginTop: 7, letterSpacing: -0.4 }, detail: { fontSize: 12, fontWeight: '500', marginTop: 5 }, star: { color: '#FBBF24' } });
