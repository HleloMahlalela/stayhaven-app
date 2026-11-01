import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  email: string; password: string; error: string; submitting: boolean;
  onEmailChange: (value: string) => void; onPasswordChange: (value: string) => void; onSubmit: () => void;
};

export default function LoginForm({ email, password, error, submitting, onEmailChange, onPasswordChange, onSubmit }: Props) {
  return (
    <View className="gap-4">
      <View>
        <Text className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white">Email address</Text>
        <TextInput value={email} onChangeText={onEmailChange} autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Enter account" placeholderTextColor="#9CA3AF" accessibilityLabel="Email address" className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-3.5 py-3 text-sm text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white" />
      </View>
      <View>
        <Text className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white">Password</Text>
        <TextInput value={password} onChangeText={onPasswordChange} autoComplete="current-password" secureTextEntry placeholder="Enter password" placeholderTextColor="#9CA3AF" accessibilityLabel="Password" className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-3.5 py-3 text-sm text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white" />
      </View>
      {error ? <Text accessibilityRole="alert" className="text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
      <TouchableOpacity onPress={onSubmit} disabled={submitting} accessibilityRole="button" className="mt-2 w-full items-center rounded-full bg-[#7C3AED] py-3.5 shadow-md dark:bg-[#8B5CF6] disabled:opacity-60">
        <Text className="text-base font-semibold text-white">{submitting ? 'Signing in…' : 'Sign in'}</Text>
      </TouchableOpacity>
    </View>
  );
}
