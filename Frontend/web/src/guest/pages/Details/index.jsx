import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Amenities from './components/Amenities'
import BookingSidebar from './components/BookingSidebar'
import ImageGallery from './components/ImageGallery'
import api from '../../../services/api'

export default function Details() {
  const navigate = useNavigate()
  const route = useLocation()
  const [listing, setListing] = useState(route.state?.listing || null)
  const [loadError, setLoadError] = useState('')
  useEffect(() => { if (!listing) { const id = new URLSearchParams(route.search).get('id'); if (!id) { setLoadError('Select a listing from Explore to view its details.'); return } api.get(`/listings/${id}`).then(({ data }) => setListing({ ...data, id: data._id, name: data.title, image: data.images?.[0] || '' })).catch(() => setLoadError('Unable to load this listing.')) } }, [listing, route.search])
  const title = listing?.title || listing?.name || ''
  const location = listing?.location || ''
  const hostName = listing?.hostName || ''
  const [favorite, setFavorite] = useState(false)
  const openContact = async () => {
    const listingId = listing?._id || listing?.id
    if (typeof listingId !== 'string' || !/^[a-f\d]{24}$/i.test(listingId)) {
      window.alert('This listing has an invalid ID and cannot start a conversation.')
      return
    }
    try {
      const { data: thread } = await api.post('/messages/threads', { listingId })
      navigate(`/messages?threadId=${thread._id}`)
    } catch (error) { window.alert(error.response?.data?.message || 'Please sign in to message this host.') }
  }
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
            <div className="my-5 border-t border-[#E5E7EB] dark:border-[#1E2A45]" /><p className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">4 guests · 2 beds · 1 private bathroom</p>
          </section>
          <section><h2 className="mb-3 text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">About this guesthouse</h2><p className="text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{listing.description || 'A carefully hosted retreat with warm interiors, peaceful shared spaces, and everything needed for a comfortable stay. Enjoy local recommendations from your host and easy access to nearby Botswana attractions.'}</p></section>
          <Amenities amenities={listing.amenities || []} />
          <section className="flex items-center gap-4 rounded-[32px] border border-[#EDE9FE] bg-[#F5F3FF] p-5 dark:border-[#1E2A45] dark:bg-[#141B2D] sm:p-6"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-lg font-bold text-white shadow-sm dark:bg-[#8B5CF6]">{hostName.slice(0, 1)}</div><div className="min-w-0 flex-1"><h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9]">Hosted by {hostName}</h3><p className="mt-0.5 text-sm text-[#64748B] dark:text-[#94A3B8]">Responds within an hour</p></div><button type="button" onClick={openContact} className="shrink-0 rounded-full border border-[#7C3AED]/30 bg-white px-4 py-2 text-xs font-semibold text-[#7C3AED]">Contact host</button></section>
        </div>
        <BookingSidebar listingId={listing.id || listing._id} price={Number(listing.price) || 0} discount={Number(listing.discount) || 0} discountInterval={Number(listing.discountInterval) || 1} />
      </div>
    </div>
  </main>
}
