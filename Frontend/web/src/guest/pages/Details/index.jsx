import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Amenities from './components/Amenities'
import BookingSidebar from './components/BookingSidebar'
import ImageGallery from './components/ImageGallery'
import api from '../../../services/api'

export default function Details() {
  const route = useLocation()
  const [listing, setListing] = useState(route.state?.listing || null)
  const [loadError, setLoadError] = useState('')
  useEffect(() => { if (!listing) { const id = new URLSearchParams(route.search).get('id'); if (!id) { setLoadError('Select a listing from Explore to view its details.'); return } api.get(`/listings/${id}`).then(({ data }) => setListing({ ...data, id: data._id, name: data.title, image: data.images?.[0] || '' })).catch(() => setLoadError('Unable to load this listing.')) } }, [listing, route.search])
  const title = listing?.title || listing?.name || ''
  const location = listing?.location || ''
  const hostName = listing?.hostName || ''
  const [favorite, setFavorite] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    try { setFavorite(JSON.parse(localStorage.getItem('stayhaven-favorites') || '{}')[title] ?? Boolean(listing.isFavorite)) } catch { setFavorite(Boolean(listing.isFavorite)) }
  }, [title, listing.isFavorite])
  function toggleFavorite() {
    const next = !favorite
    setFavorite(next)
    try {
      const favorites = JSON.parse(localStorage.getItem('stayhaven-favorites') || '{}')
      localStorage.setItem('stayhaven-favorites', JSON.stringify({ ...favorites, [title]: next }))
    } catch { localStorage.setItem('stayhaven-favorites', JSON.stringify({ [title]: next })) }
  }
  if (!listing) return <main className="min-h-screen p-12 text-center text-[#64748B]">{loadError || 'Loading listing…'}</main>
  return <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
      <div className="mb-6"><Link to="/explore" className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white"><span className="material-symbols-outlined text-[18px]">arrow_back</span>Back to explore</Link></div>
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="w-full space-y-10 lg:w-[66%]">
          <ImageGallery listing={listing} />
          <section>
            <div className="flex items-start justify-between gap-3"><h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-[40px] sm:leading-[48px]">{title}</h1><button type="button" aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={favorite} onClick={toggleFavorite} className="mt-1 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold dark:border-[#1E2A45] dark:bg-[#141B2D]"><span className={`material-symbols-outlined ${favorite ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`} style={{ fontVariationSettings: favorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>Favorite</button></div>
            <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 text-sm text-[#64748B] dark:text-[#94A3B8]"><span className="material-symbols-outlined text-[17px] text-[#7C3AED] dark:text-[#A78BFA]">location_on</span><span className="font-medium text-[#0F172A] dark:text-[#F1F5F9]">{location}</span><span>·</span><span>{listing.tag || 'Near local attractions'}</span></div>
            <Link to="/reviews" aria-label="Read reviews" className="mt-2 flex flex-wrap items-center gap-2 text-sm hover:underline"><span className="material-symbols-outlined text-[17px] text-[#7C3AED] dark:text-[#A78BFA]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><b className="text-[#0F172A] dark:text-[#F1F5F9]">{listing.rating || '4.92'}</b><span className="text-[#64748B] dark:text-[#94A3B8]">· {listing.reviews || 86} reviews ·</span><span className="rounded-full bg-[#EDE9FE] px-2 py-0.5 text-xs font-semibold text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#C4B5FD]">Guest favorite</span></Link>
            <div className="my-5 border-t border-[#E5E7EB] dark:border-[#1E2A45]" /><p className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">4 guests · 2 beds · 1 private bathroom</p>
          </section>
          <section><h2 className="mb-3 text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">About this guesthouse</h2><p className="text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{listing.description || 'A carefully hosted retreat with warm interiors, peaceful shared spaces, and everything needed for a comfortable stay. Enjoy local recommendations from your host and easy access to nearby Botswana attractions.'}</p></section>
          <Amenities amenities={listing.amenities || []} />
          <section className="flex items-center gap-4 rounded-[32px] border border-[#EDE9FE] bg-[#F5F3FF] p-5 dark:border-[#1E2A45] dark:bg-[#141B2D] sm:p-6"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-lg font-bold text-white shadow-sm dark:bg-[#8B5CF6]">{hostName.slice(0, 1)}</div><div className="min-w-0 flex-1"><h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9]">Hosted by {hostName}</h3><p className="mt-0.5 text-sm text-[#64748B] dark:text-[#94A3B8]">Responds within an hour</p></div><button type="button" onClick={() => setContactOpen(true)} className="shrink-0 rounded-full border border-[#7C3AED]/30 bg-white px-4 py-2 text-xs font-semibold text-[#7C3AED]">Contact host</button></section>
        </div>
        <BookingSidebar price={Number(listing.price) || 0} discount={Number(listing.discount) || 0} rating={listing.rating} />
      </div>
    </div>
    {contactOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label={`Message ${listing.hostName}`}><div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl dark:bg-[#141B2D]"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Message {listing.hostName}</h2><button onClick={() => setContactOpen(false)} aria-label="Close">✕</button></div><div className="mb-4 min-h-40 space-y-2 rounded-xl bg-gray-50 p-3 dark:bg-[#0A0E1A]">{messages.map((text, i) => <p key={i} className="rounded-lg bg-violet-100 p-2 text-sm dark:bg-[#2A1F4E]">{text}</p>)}</div><form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (message.trim()) { setMessages(m => [...m, message.trim()]); setMessage('') } }}><input value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a message..." className="min-w-0 flex-1 rounded-xl border px-4 py-3 dark:bg-[#0A0E1A]" /><button className="rounded-xl bg-[#7C3AED] px-5 font-semibold text-white">Send</button></form></div></div>}
  </main>
}
