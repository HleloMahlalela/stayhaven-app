import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

type UserData = {
  id?: string;
  name: string;
  fullName?: string;
  email: string;
  role: string;
};

const normalizeUser = (user: Partial<UserData>): UserData => ({
  ...user,
  name: user.name ?? user.fullName ?? '',
  email: user.email ?? '',
  role: user.role ?? '',
});

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get<UserData | { user: UserData }>('/auth/me')
      .then(({ data }) => {
        if (!active) return;
        const profile = normalizeUser('user' in data ? data.user : data);
        setUserData(profile);
        setName(profile.name);
        setEmail(profile.email);
      })
      .catch((requestError) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load your profile. Please sign in again.');
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const startEditing = () => {
    if (!userData) return;
    setName(userData.name);
    setEmail(userData.email);
    setError('');
    setIsEditing(true);
  };

  const saveProfile = async () => {
    setError('');
    setIsSaving(true);
    try {
      const { data } = await api.put<UserData | { user: UserData }>('/auth/profile', { name: name.trim(), email: email.trim() });
      const responseUser = 'user' in data ? data.user : data;
      const updated = normalizeUser({ ...userData, ...responseUser, name: responseUser.name ?? responseUser.fullName ?? name.trim(), email: responseUser.email ?? email.trim() });
      setUserData(updated);
      setName(updated.name);
      setEmail(updated.email);
      setIsEditing(false);
      if (Platform.OS === 'web') window.alert('Profile updated!');
      else Alert.alert('Profile updated!');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  const inputClass = 'mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white';

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] px-5 dark:bg-[#0A0E1A]">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="pt-8">
          <Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">YOUR ACCOUNT</Text>
          <Text className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Profile</Text>
          <View className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 dark:border-[#1E2A45] dark:bg-[#141B2D]">
            <View className="mb-6 items-center">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-violet-100 dark:bg-[#1E2A45]">
                <Ionicons name="person" size={36} color="#7C3AED" />
              </View>
              <Text className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">Your account details</Text>
            </View>

            {isLoading ? <Text className="text-center text-sm text-gray-500 dark:text-[#94A3B8]">Loading profile…</Text> : null}
            {error ? <Text accessibilityRole="alert" className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}

            {!isLoading && userData && (isEditing ? (
              <View>
                <Text className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</Text>
                <TextInput value={name} onChangeText={setName} autoComplete="name" className={inputClass} />
                <Text className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</Text>
                <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" className={inputClass} />
                <Text className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Role</Text>
                <Text className="mt-2 border-b border-gray-100 pb-4 text-gray-900 dark:border-[#1E2A45] dark:text-white">{userData.role || '—'}</Text>
                <TouchableOpacity onPress={saveProfile} disabled={isSaving} accessibilityRole="button" className="mt-6 items-center rounded-full bg-[#7C3AED] py-3.5 disabled:opacity-60">
                  <Text className="font-semibold text-white">{isSaving ? 'Saving…' : 'Save Changes'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsEditing(false); setError(''); }} className="mt-3 items-center py-2">
                  <Text className="font-semibold text-gray-600 dark:text-gray-300">Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {[
                  ['Name', userData.name],
                  ['Email', userData.email],
                  ['Role', userData.role],
                ].map(([label, value]) => (
                  <View key={label} className="border-b border-gray-100 py-4 dark:border-[#1E2A45]">
                    <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">{label}</Text>
                    <Text className="mt-1 font-semibold text-gray-900 dark:text-white">{value || '—'}</Text>
                  </View>
                ))}
                <TouchableOpacity onPress={startEditing} accessibilityRole="button" className="mt-6 items-center rounded-full bg-[#7C3AED] py-3.5">
                  <Text className="font-semibold text-white">Edit Profile</Text>
                </TouchableOpacity>
              </View>
            ))}

            {!isLoading && !userData && (
              <TouchableOpacity onPress={() => router.push('/login')} accessibilityRole="link" className="items-center py-3">
                <Text className="font-semibold text-[#7C3AED] dark:text-[#A78BFA]">Sign in to view your profile</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleSignOut} accessibilityRole="button" className="mt-4 items-center rounded-full border border-gray-200 py-3.5 dark:border-[#334155]">
              <Text className="font-semibold text-gray-700 dark:text-gray-200">Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
