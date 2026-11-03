import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

type Thread = { _id: string; guestId?: { fullName?: string } | string; houselisterId?: { fullName?: string } | string; listingId?: { title?: string; location?: string } | string; bookingId?: { checkInDate?: string; checkOutDate?: string } | string; lastMessage?: { body?: string } };
type Message = { _id: string; body: string; senderId: string; senderRole: string; createdAt: string };
const personName = (person: Thread['guestId']) => typeof person === 'object' && person ? person.fullName || '' : '';
const listingTitle = (listing: Thread['listingId']) => typeof listing === 'object' && listing ? listing.title || 'Listing' : 'Listing';
const bookingDates = (booking: Thread['bookingId']) => typeof booking === 'object' && booking?.checkInDate ? `${new Date(booking.checkInDate).toLocaleDateString()} – ${new Date(booking.checkOutDate || '').toLocaleDateString()}` : '';

export default function MessagesScreen() {
  const params = useLocalSearchParams<{ listingId?: string; bookingId?: string; threadId?: string }>();
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadId, setThreadId] = useState(params.threadId || '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const loadThreads = useCallback(async () => {
    const { data } = await api.get<Thread[]>('/messages/threads');
    setThreads(Array.isArray(data) ? data : []);
  }, []);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        let selected = params.threadId || '';
        if (params.listingId) {
          const { data } = await api.post<Thread>('/messages/threads', { listingId: params.listingId, ...(params.bookingId ? { bookingId: params.bookingId } : {}) });
          selected = data._id;
        }
        await loadThreads();
        if (active && selected) setThreadId(selected);
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load messages.');
      }
    })();
    return () => { active = false; };
  }, [params.listingId, params.bookingId, params.threadId, loadThreads]);
  const loadMessages = useCallback(async (id: string) => {
    if (!id) { setMessages([]); return; }
    try {
      const { data } = await api.get<{ messages: Message[] }>(`/messages/threads/${id}`);
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Unable to load this conversation.'); }
  }, []);
  useEffect(() => { loadMessages(threadId); }, [threadId, loadMessages]);
  const sendMessage = async () => {
    if (!threadId || !body.trim() || sending) return;
    setSending(true); setError('');
    try {
      await api.post(`/messages/threads/${threadId}/messages`, { body: body.trim() });
      setBody('');
      await Promise.all([loadMessages(threadId), loadThreads()]);
    } catch (requestError) {
      const text = requestError instanceof Error ? requestError.message : 'Unable to send your message.';
      setError(text);
      if (Platform.OS !== 'web') Alert.alert('Unable to send', text);
    } finally { setSending(false); }
  };
  return <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F9FA] px-4 dark:bg-[#0A0E1A]"><ScrollView contentContainerStyle={{ paddingBottom: 100 }}><View className="pt-8"><Text className="text-xs font-bold tracking-[1.5px] text-[#7C3AED]">YOUR CONVERSATIONS</Text><Text className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">Messages</Text></View>{error ? <Text accessibilityRole="alert" className="mt-5 text-sm text-red-600">{error}</Text> : null}<View className="mt-6 gap-3">{threads.map((thread) => {
    const peer = user?.role === 'HOUSE_ADMIN' ? personName(thread.guestId) : personName(thread.houselisterId);
    return <TouchableOpacity key={thread._id} onPress={() => setThreadId(thread._id)} accessibilityRole="button" className={`rounded-2xl border p-4 ${threadId === thread._id ? 'border-[#7C3AED] bg-violet-50 dark:bg-[#1E2A45]' : 'border-gray-200 bg-white dark:border-[#1E2A45] dark:bg-[#141B2D]'}`}><Text className="font-semibold text-gray-900 dark:text-white">{peer || 'Conversation'}</Text><Text className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">{listingTitle(thread.listingId)}</Text>{bookingDates(thread.bookingId) ? <Text className="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">{bookingDates(thread.bookingId)}</Text> : null}<Text numberOfLines={1} className="mt-2 text-xs text-[#64748B] dark:text-[#94A3B8]">{thread.lastMessage?.body || 'No messages yet'}</Text></TouchableOpacity>;
  })}{!threads.length && !error ? <View className="rounded-2xl border border-dashed border-gray-300 p-8 dark:border-[#334155]"><Text className="text-center text-sm text-gray-500 dark:text-[#94A3B8]">No conversations yet.</Text></View> : null}</View>{threadId ? <View className="mt-5 rounded-3xl border border-gray-200 bg-white p-4 dark:border-[#1E2A45] dark:bg-[#141B2D]"><Text className="mb-3 font-bold text-gray-900 dark:text-white">{listingTitle(threads.find(item => item._id === threadId)?.listingId)}</Text>{messages.map(message => <View key={message._id} className={`mb-2 max-w-[90%] rounded-xl p-3 ${message.senderId === user?.id ? 'self-end bg-violet-100 dark:bg-[#2A1F4E]' : 'self-start bg-gray-50 dark:bg-[#0A0E1A]'}`}><Text className="text-sm text-gray-900 dark:text-white">{message.body}</Text></View>)}{!messages.length ? <Text className="text-sm text-gray-500 dark:text-[#94A3B8]">Start the conversation with a message.</Text> : null}<View className="mt-3 flex-row items-center gap-2"><TextInput value={body} onChangeText={setBody} placeholder="Write a message..." placeholderTextColor="#94A3B8" className="min-h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white" /><TouchableOpacity onPress={sendMessage} disabled={sending} accessibilityRole="button" accessibilityLabel="Send message" className="h-12 items-center justify-center rounded-full bg-[#7C3AED] px-5"><Text className="font-semibold text-white">Send</Text></TouchableOpacity></View></View> : null}</ScrollView></SafeAreaView>;
}
