import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import api, { saveAccessToken } from '../../../services/api';
import GuestHeader from '../../../components/GuestHeader';
import LoginForm from './components/LoginForm';

type LoginResponse = { accessToken?: string; token?: string; user?: { role?: string } };
const backdrop = 'https://lh3.googleusercontent.com/aida/AEtjO1XkZS6nTAntIueqvkRuOLgh9lGMPdVKARWMHXsya8BMSOVaLNtc9fFxtDkz6WLr8XBHqKIcaKwhwKJNI2xXg-_RojEQL6b8OZcWRaAziFg-RqpviSaYxCHlkyqnoyooMVrYe6pPg25k4gc3PwCwk6uPy79CY0UP4jJ_YviFy6sFP8Q47MQiBlHFgQXL8oXg-BZ8tERPdiCpyTEvHNUt7Z1dZwv8nE5uQo7_MLx-ykTlSasFRxlY1pbpP4I';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(''); setSubmitting(true);
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', { email: email.trim(), password });
      const token = data.accessToken ?? data.token;
      if (!token) throw new Error('The sign-in response did not include an access token.');
      await saveAccessToken(token);
      router.replace('/');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in. Please try again.');
    } finally { setSubmitting(false); }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F3FF] dark:bg-[#0A0E1A]">
      <View className="absolute inset-0">
        <Image source={{ uri: backdrop }} resizeMode="cover" blurRadius={8} className="absolute h-full w-full" />
        <View className="absolute inset-0 bg-white/60 dark:bg-[#0A0E1A]/80" />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="mx-4 w-full max-w-[360px] self-center rounded-[32px] bg-white p-6 shadow-2xl dark:border dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <GuestHeader onClose={() => router.back()} showThemeToggle={false} />
          <View>
            <Text className="text-[28px] font-bold leading-tight tracking-tight text-gray-900 dark:text-white">Welcome back</Text>
            <Text className="mb-6 mt-2 text-[15px] text-[#6B7280] dark:text-[#94A3B8]">Sign in with your registered account.</Text>
          </View>
          <LoginForm email={email} password={password} error={error} submitting={submitting} onEmailChange={setEmail} onPasswordChange={setPassword} onSubmit={handleSubmit} />
          <View className="mt-6 flex-col items-center gap-2">
            <View className="flex-row">
              <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">New to StayHaven? </Text>
              <TouchableOpacity onPress={() => router.push('/register')} accessibilityRole="link">
                <Text className="text-sm font-bold text-[#7C3AED] dark:text-[#A78BFA]">Create an account</Text>
              </TouchableOpacity>
            </View>
            <Text className="mt-2 px-2 text-center text-xs leading-normal text-gray-400 dark:text-[#94A3B8]">Your next unforgettable stay is just a click away.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
