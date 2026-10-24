import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DashboardHeader({ theme, dark }) {
  return (
    <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
      <View style={styles.brand}>
        <View style={[styles.logo, { backgroundColor: theme.purple }]}><Text style={styles.home}>⌂</Text></View>
        <Text style={[styles.brandText, { color: theme.text }]}>StayHaven</Text>
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityLabel="Toggle theme" style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={{ color: theme.text, fontSize: 17 }}>{dark ? '☼' : '☾'}</Text>
        </Pressable>
        <Pressable style={[styles.signout, { backgroundColor: theme.card, borderColor: theme.border }]}><Text style={{ color: theme.secondary, fontSize: 12, fontWeight: '600' }}>Sign out</Text></Pressable>
        <View style={[styles.avatar, { backgroundColor: theme.purple }]}><Text style={styles.avatarText}>●</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 68, paddingHorizontal: 16, paddingTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 }, logo: { width: 32, height: 32, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }, home: { color: '#fff', fontSize: 21, fontWeight: '700', marginTop: -3 }, brandText: { fontSize: 18, fontWeight: '700', letterSpacing: -0.4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 }, iconButton: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, signout: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 }, avatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#fff', fontSize: 13 },
});
