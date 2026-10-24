import { Pressable, StyleSheet, Text, View } from 'react-native';

const tabs = [
  { label: 'Dashboard', icon: '⌂' },
  { label: 'Listings', icon: '▤' },
  { label: 'Bookings', icon: '▦' },
];

export default function BottomNavbar({ theme, active = 'Dashboard' }) {
  return <View style={[styles.bar, { backgroundColor: theme.card, borderColor: theme.border }]}>
    {tabs.map((tab) => {
      const selected = tab.label === active;
      return <Pressable accessibilityRole="button" accessibilityState={{ selected }} key={tab.label} style={styles.tab}>
        <View style={[styles.inner, selected && { backgroundColor: theme.purpleTint }]}>
          <Text style={[styles.icon, { color: selected ? theme.purple : theme.secondary }]}>{tab.icon}</Text>
          {selected ? <Text style={[styles.selectedLabel, { color: theme.purple }]}>{tab.label}</Text> : null}
        </View>
        {!selected ? <Text style={[styles.label, { color: theme.secondary }]}>{tab.label}</Text> : null}
      </Pressable>;
    })}
  </View>;
}

const styles = StyleSheet.create({ bar: { position: 'absolute', bottom: 16, left: 16, right: 16, height: 64, maxWidth: 358, alignSelf: 'center', borderWidth: 1, borderRadius: 32, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', elevation: 10, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } }, tab: { alignItems: 'center', justifyContent: 'center', minWidth: 76 }, inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 20 }, icon: { fontSize: 17, lineHeight: 19 }, selectedLabel: { fontSize: 11, fontWeight: '600' }, label: { fontSize: 10, fontWeight: '500', marginTop: 1 } });
