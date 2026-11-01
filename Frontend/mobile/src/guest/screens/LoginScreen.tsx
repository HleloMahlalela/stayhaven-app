import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import api, { saveAccessToken } from '../../services/api';

type LoginResponse = {
  accessToken?: string;
  token?: string;
  user?: { role?: string };
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', { email: email.trim(), password });
      const token = data.accessToken ?? data.token;
      if (!token) throw new Error('The sign-in response did not include an access token.');
      await saveAccessToken(token);
      router.replace('/');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA] px-5 dark:bg-[#0A0E1A]">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-950 dark:text-white">Welcome back</Text>
        <Text className="mt-2 text-sm text-gray-500 dark:text-[#94A3B8]">Sign in to manage your Botswana stays.</Text>
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Email address" placeholderTextColor="#94A3B8" className="mt-8 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-[#1E2A45] dark:bg-[#141B2D] dark:text-white" />
        <TextInput value={password} onChangeText={setPassword} autoComplete="current-password" secureTextEntry placeholder="Password" placeholderTextColor="#94A3B8" className="mt-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-[#1E2A45] dark:bg-[#141B2D] dark:text-white" />
        {error ? <Text accessibilityRole="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
        <TouchableOpacity onPress={handleSubmit} disabled={submitting} accessibilityRole="button" className="mt-5 items-center rounded-full bg-[#7C3AED] py-3.5 disabled:opacity-60">
          <Text className="font-semibold text-white">{submitting ? 'Signing in…' : 'Sign in'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')} accessibilityRole="link" className="mt-5 items-center">
          <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">New to StayHaven? <Text className="font-semibold text-[#7C3AED] dark:text-[#A78BFA]">Create a guest account</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
