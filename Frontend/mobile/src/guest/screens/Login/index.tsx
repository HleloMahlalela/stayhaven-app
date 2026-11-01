import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';

const backdrop = 'https://lh3.googleusercontent.com/aida/AEtjO1XkZS6nTAntIueqvkRuOLgh9lGMPdVKARWMHXsya8BMSOVaLNtc9fFxtDkz6WLr8XBHqKIcaKwhwKJNI2xXg-_RojEQL6b8OZcWRaAziFg-RqpviSaYxCHlkyqnoyooMVrYe6pPg25k4gc3PwCwk6uPy79CY0UP4jJ_YviFy6sFP8Q47MQiBlHFgQXL8oXg-BZ8tERPdiCpyTEvHNUt7Z1dZwv8nE5uQo7_MLx-ykTlSasFRxlY1YbpP4I';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Enter your email and password to continue.'); return; }
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      if (Platform.OS === 'web') window.alert('Signed in successfully!');
      else Alert.alert('Success', 'Signed in successfully!');
      router.replace('/');
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : '';
      setError(message.toLowerCase().includes('invalid') ? 'Invalid credentials.' : message || 'Unable to sign in. Please try again.');
    } finally { setSubmitting(false); }
  };

  const inputClass = 'w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-3.5 py-3.5 pr-12 text-sm text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white';
  return (
    <SafeAreaView className="flex-1 bg-[#F1F3FF] dark:bg-[#0A0E1A]">
      <View className="absolute inset-0">
        <Image source={{ uri: backdrop }} resizeMode="cover" blurRadius={8} className="absolute h-full w-full" />
        <View className="absolute inset-0 bg-white/60 dark:bg-[#0A0E1A]/80" />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="mx-4 w-full max-w-[360px] self-center rounded-[32px] bg-white p-6 shadow-2xl dark:border dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <View className="mb-8 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2.5">
              <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED] shadow-md dark:bg-[#8B5CF6]"><Ionicons name="home" size={20} color="white" /></View>
              <Text className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">StayHaven</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close" className="h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45]"><Ionicons name="close" size={18} color="#64748B" /></TouchableOpacity>
          </View>
          <Text className="text-[28px] font-bold leading-tight tracking-tight text-gray-900 dark:text-white">Welcome back</Text>
          <Text className="mb-6 mt-2 text-[15px] text-[#6B7280] dark:text-[#94A3B8]">Sign in with your registered account.</Text>

          <View className="gap-4">
            <View>
              <Text className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white">Email address</Text>
              <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Enter account" placeholderTextColor="#94A3B8" accessibilityLabel="Email address" returnKeyType="next" className={inputClass} />
            </View>
            <View>
              <Text className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white">Password</Text>
              <View className="relative justify-center">
                <TextInput value={password} onChangeText={setPassword} autoComplete="current-password" secureTextEntry={!showPassword} placeholder="Enter password" placeholderTextColor="#94A3B8" accessibilityLabel="Password" returnKeyType="go" onSubmitEditing={handleSubmit} className={inputClass} />
                <TouchableOpacity onPress={() => setShowPassword((visible) => !visible)} accessibilityRole="button" accessibilityLabel={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 h-10 w-10 items-center justify-center"><Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#94A3B8" /></TouchableOpacity>
              </View>
            </View>
            {error ? <Text accessibilityRole="alert" className="text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
            <TouchableOpacity onPress={handleSubmit} disabled={submitting} accessibilityRole="button" className="mt-2 w-full items-center rounded-full bg-[#7C3AED] py-3.5 shadow-md dark:bg-[#8B5CF6] disabled:opacity-60">
              <Text className="text-base font-semibold text-white">{submitting ? 'Signing in…' : 'Sign in'}</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6 items-center gap-2">
            <View className="flex-row"><Text className="text-sm text-gray-500 dark:text-[#94A3B8]">New to StayHaven? </Text><TouchableOpacity onPress={() => router.push('/register')} accessibilityRole="link"><Text className="text-sm font-bold text-[#7C3AED] dark:text-[#A78BFA]">Create an account</Text></TouchableOpacity></View>
            <Text className="mt-2 px-2 text-center text-xs leading-normal text-gray-400 dark:text-[#94A3B8]">Your next unforgettable stay is just a click away.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
