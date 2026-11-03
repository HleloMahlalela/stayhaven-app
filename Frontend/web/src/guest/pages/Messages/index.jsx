import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'

const displayName = (person) => typeof person === 'string' ? '' : person?.fullName || ''
const dateLabel = (date) => date ? new Date(date).toLocaleDateString() : ''

export default function Messages() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const listingId = params.get('listingId')
  const bookingId = params.get('bookingId')
  const requestedThreadId = params.get('threadId')
  const [threads, setThreads] = useState([])
  const [threadId, setThreadId] = useState(requestedThreadId)
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const loadThreads = useCallback(async () => {
    const { data } = await api.get('/messages/threads')
    setThreads(Array.isArray(data) ? data : [])
    return Array.isArray(data) ? data : []
  }, [])
  useEffect(() => {
    let active = true
    const initialize = async () => {
      try {
        let nextId = requestedThreadId
        if (listingId) {
          const { data } = await api.post('/messages/threads', { listingId, ...(bookingId ? { bookingId } : {}) })
          nextId = data._id
          if (active) setThreadId(nextId)
        }
        await loadThreads()
        if (active && nextId) setThreadId(nextId)
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || 'Unable to load messages.')
      }
    }
    initialize()
    return () => { active = false }
  }, [listingId, bookingId, requestedThreadId, loadThreads])
  const refreshMessages = useCallback(async (id) => {
    if (!id) { setMessages([]); return }
    try {
      const { data } = await api.get(`/messages/threads/${id}`)
      setMessages(Array.isArray(data.messages) ? data.messages : [])
    } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to load this conversation.') }
  }, [])
  useEffect(() => { refreshMessages(threadId) }, [threadId, refreshMessages])
  const sendMessage = async (event) => {
    event.preventDefault()
    if (!threadId || !body.trim() || sending) return
    setSending(true); setError('')
    try {
      await api.post(`/messages/threads/${threadId}/messages`, { body: body.trim() })
      setBody('')
      await Promise.all([refreshMessages(threadId), loadThreads()])
    } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to send your message.') }
    finally { setSending(false) }
  }
  return <main className="min-h-screen bg-[#F8F9FA] px-4 py-10 text-[#0F172A] dark:bg-[#0A0E1A] dark:text-white"><div className="mx-auto max-w-6xl"><h1 className="text-3xl font-bold">Messages</h1>{error && <p role="alert" className="mt-5 text-sm text-red-600">{error}</p>}<div className="mt-8 grid gap-5 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.4fr)]"><section className="space-y-3">{threads.map((thread) => { const listing = thread.listingId || {}; const booking = thread.bookingId || {}; const contact = user?.role === 'HOUSE_ADMIN' ? displayName(thread.guestId) : displayName(thread.houselisterId); return <button key={thread._id} type="button" onClick={() => setThreadId(thread._id)} className={`w-full rounded-2xl border p-4 text-left ${threadId === thread._id ? 'border-[#7C3AED] bg-[#F5F3FF] dark:bg-[#1E2A45]' : 'border-gray-200 bg-white dark:border-[#1E2A45] dark:bg-[#141B2D]'}`}><span className="block font-semibold">{contact || 'Conversation'}</span><span className="mt-1 block text-sm text-[#64748B] dark:text-[#94A3B8]">{listing.title || 'Listing'}</span>{booking.checkInDate && <span className="mt-1 block text-xs text-[#64748B] dark:text-[#94A3B8]">{dateLabel(booking.checkInDate)} – {dateLabel(booking.checkOutDate)}</span>}<span className="mt-2 block truncate text-xs text-[#64748B] dark:text-[#94A3B8]">{thread.lastMessage?.body || 'No messages yet'}</span></button> })}{!threads.length && !error && <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-[#64748B]">No conversations yet.</p>}</section><section className="flex min-h-[420px] flex-col rounded-3xl border border-gray-200 bg-white p-5 dark:border-[#1E2A45] dark:bg-[#141B2D]">{threadId ? <><div className="min-h-0 flex-1 space-y-3 overflow-y-auto">{messages.map((message) => <p key={message._id} className="max-w-[85%] rounded-xl bg-gray-50 p-3 text-sm dark:bg-[#0A0E1A]">{message.body}</p>)}{!messages.length && <p className="text-sm text-[#64748B]">Start the conversation with a message.</p>}</div><form onSubmit={sendMessage} className="mt-4 flex gap-2"><input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write a message..." className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 dark:border-[#1E2A45] dark:bg-[#0A0E1A]" /><button disabled={sending} className="rounded-xl bg-[#7C3AED] px-5 font-semibold text-white disabled:opacity-60">Send</button></form></> : <p className="m-auto text-sm text-[#64748B]">Select a conversation to view messages.</p>}</section></div></div></main>
}
