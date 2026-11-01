import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../services/api';

export default function GuestRegistrationScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 10) {
      setError('Password must be at least 10 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/auth/register', { name: trimmedName, fullName: trimmedName, email: trimmedEmail, password, role: 'GUEST' });
      if (Platform.OS === 'web') window.alert('Account created successfully!');
      else Alert.alert('Account created successfully!');
      router.replace('/login');
    } catch (requestError) {
      const responseError = requestError as { response?: { data?: { error?: { message?: string }; message?: string } } };
      setError(responseError.response?.data?.error?.message || responseError.response?.data?.message || 'Unable to create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-[#1E2A45] dark:bg-[#141B2D] dark:text-white';

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA] px-5 dark:bg-[#0A0E1A]">
      <View className="flex-1 justify-center py-10">
        <Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">JOIN STAYHAVEN</Text>
        <Text className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Create a guest account</Text>
        <Text className="mt-2 text-sm text-gray-500 dark:text-[#94A3B8]">Create an account to plan and manage your stays.</Text>

        <TextInput value={name} onChangeText={setName} autoComplete="name" placeholder="Full Name" placeholderTextColor="#94A3B8" className={inputClass} />
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Email" placeholderTextColor="#94A3B8" className={inputClass} />
        <TextInput value={password} onChangeText={setPassword} autoComplete="new-password" secureTextEntry placeholder="Password" placeholderTextColor="#94A3B8" className={inputClass} />
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} autoComplete="new-password" secureTextEntry placeholder="Confirm Password" placeholderTextColor="#94A3B8" className={inputClass} />

        {error ? <Text accessibilityRole="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
        <TouchableOpacity onPress={handleSubmit} disabled={submitting} accessibilityRole="button" className="mt-5 items-center rounded-full bg-[#7C3AED] py-3.5 disabled:opacity-60">
          <Text className="font-semibold text-white">{submitting ? 'Creating account…' : 'Create account'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/login')} accessibilityRole="link" className="mt-5 items-center">
          <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">Already have an account? <Text className="font-semibold text-[#7C3AED] dark:text-[#A78BFA]">Sign in</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
