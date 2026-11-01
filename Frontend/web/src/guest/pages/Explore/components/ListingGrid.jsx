import { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import { initialListings } from '../../../data/listings'

export default function ListingGrid({ filters = {} }) {
  const [listings, setListings] = useState(initialListings)
  const [showFavorites, setShowFavorites] = useState(false)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('stayhaven-favorites') || '{}')
      setListings((current) => current.map((listing) => Object.prototype.hasOwnProperty.call(saved, listing.name) ? { ...listing, isFavorite: saved[listing.name] } : listing))
    } catch { /* Keep the defaults when saved favorites are malformed. */ }
  }, [])
  const searched = listings.filter(listing => (!filters.location || filters.location === 'All destinations' || listing.location.toLowerCase().includes(filters.location.toLowerCase())) && (!filters.date || filters.date === 'Select a date' || !(listing.unavailableDates || []).includes(filters.date)))
  const visibleListings = (showFavorites ? searched.filter((listing) => listing.isFavorite === true) : searched)

  const toggleFavorite = (name, favorite) => {
    setListings((currentListings) => currentListings.map((listing) =>
      listing.name === name ? { ...listing, isFavorite: favorite } : listing,
    ))
  }

  return (
    <section className="mt-16 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div><span className="text-xs font-bold text-[#7C3AED] tracking-[1.5px] uppercase">Handpicked for you</span><h2 className="text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">Stays with a little soul</h2></div>
        <div className="inline-flex items-center gap-3"><button aria-pressed={showFavorites} className="bg-[#EDE9FE] dark:bg-[#302452] text-[#7C3AED] hover:bg-[#DDD6FE] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm" onClick={() => setShowFavorites((value) => !value)} type="button"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span><span>Favorites</span></button><span className="text-sm font-medium text-[#64748B] dark:text-[#A6AEC0]">{visibleListings.length} homes</span></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">{visibleListings.map((listing) => <ListingCard key={listing.name} listing={listing} onToggleFavorite={(favorite) => toggleFavorite(listing.name, favorite)} />)}</div>
    </section>
  )
}
