import { StyleSheet, Text, View } from 'react-native';

export default function ArrivalNotice() {
  return <View style={styles.card}>
    <View style={styles.bell}><Text style={styles.bellText}>♧</Text></View>
    <Text style={styles.title}>Stay on top of every arrival.</Text>
    <Text style={styles.body}>Guests receive automatic email and SMS confirmations before check-in.</Text>
    <Text style={styles.link}>Manage notifications →</Text>
  </View>;
}

const styles = StyleSheet.create({ card: { marginHorizontal: 16, marginTop: 24, marginBottom: 24, borderRadius: 24, backgroundColor: '#0F172A', padding: 24 }, bell: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#263449', alignItems: 'center', justifyContent: 'center' }, bellText: { color: '#E2E8F0', fontSize: 18 }, title: { color: '#fff', fontSize: 24, lineHeight: 30, fontWeight: '700', marginTop: 16 }, body: { color: '#94A3B8', fontSize: 14, lineHeight: 21, marginTop: 8 }, link: { color: '#A78BFA', fontSize: 14, fontWeight: '700', marginTop: 16 } });
