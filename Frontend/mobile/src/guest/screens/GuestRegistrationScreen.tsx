import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { registerGuest } from '../../services/api';

export default function GuestRegistrationScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputClass = 'mt-1.5 rounded-xl border border-gray-200 bg-[#F8FAFC] px-3.5 py-3.5 text-sm text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white';

  const handleSubmit = async () => {
    setError('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) { setError('Please complete all fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setError('Please enter a valid email address.'); return; }
    if (password.length < 10) { setError('Password must be at least 10 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setSubmitting(true);
    try {
      await registerGuest(trimmedName, trimmedEmail, password);
      if (Platform.OS === 'web') window.alert('Account created!');
      else Alert.alert('Success', 'Account created!');
      router.replace('/login');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to create your account. Please try again.');
    } finally { setSubmitting(false); }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F3FF] px-4 dark:bg-[#0A0E1A]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[420px] self-center rounded-[32px] bg-white p-6 shadow-2xl dark:border dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <View className="mb-7 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2.5"><View className="h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED] dark:bg-[#8B5CF6]"><Ionicons name="home" size={20} color="white" /></View><Text className="text-xl font-bold text-gray-900 dark:text-white">StayHaven</Text></View>
            <TouchableOpacity onPress={() => router.replace('/login')} accessibilityRole="button" accessibilityLabel="Back to login" className="h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45]"><Ionicons name="close" size={18} color="#64748B" /></TouchableOpacity>
          </View>
          <Text className="text-[28px] font-bold leading-tight text-gray-900 dark:text-white">Create your account</Text>
          <Text className="mb-6 mt-2 text-[15px] text-gray-500 dark:text-[#94A3B8]">Join StayHaven and plan your next stay.</Text>
          <View className="gap-4">
            <View><Text className="text-sm font-bold text-gray-900 dark:text-white">Full Name</Text><TextInput value={name} onChangeText={setName} autoComplete="name" placeholder="Enter your full name" placeholderTextColor="#94A3B8" accessibilityLabel="Full Name" className={inputClass} /></View>
            <View><Text className="text-sm font-bold text-gray-900 dark:text-white">Email</Text><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Enter your email" placeholderTextColor="#94A3B8" accessibilityLabel="Email" className={inputClass} /></View>
            <View><Text className="text-sm font-bold text-gray-900 dark:text-white">Password</Text><TextInput value={password} onChangeText={setPassword} autoComplete="new-password" secureTextEntry placeholder="At least 10 characters" placeholderTextColor="#94A3B8" accessibilityLabel="Password" className={inputClass} /></View>
            <View><Text className="text-sm font-bold text-gray-900 dark:text-white">Confirm Password</Text><TextInput value={confirmPassword} onChangeText={setConfirmPassword} autoComplete="new-password" secureTextEntry placeholder="Re-enter your password" placeholderTextColor="#94A3B8" accessibilityLabel="Confirm Password" className={inputClass} /></View>
            {error ? <Text accessibilityRole="alert" className="text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
            <TouchableOpacity onPress={handleSubmit} disabled={submitting} accessibilityRole="button" className="mt-2 items-center rounded-full bg-[#7C3AED] py-3.5 dark:bg-[#8B5CF6] disabled:opacity-60"><Text className="text-base font-semibold text-white">{submitting ? 'Creating account…' : 'Create account'}</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.replace('/login')} accessibilityRole="link" className="mt-6 items-center"><Text className="text-sm text-gray-500 dark:text-[#94A3B8]">Already have an account? <Text className="font-bold text-[#7C3AED] dark:text-[#A78BFA]">Sign in</Text></Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
