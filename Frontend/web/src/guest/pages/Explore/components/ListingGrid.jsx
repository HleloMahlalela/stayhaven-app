import { useState } from 'react'
import ListingCard from './ListingCard'

const initialListings = [
  { name: 'Lavender House', location: 'Kampala, Uganda', price: 84, rating: '4.92', tag: 'Private garden', isFavorite: true, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85' },
  { name: 'Kigo Hillside Haven', location: 'Entebbe, Uganda', price: 112, rating: '4.98', tag: 'River views', isFavorite: false, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85' },
  { name: 'Nalubaale Stone Cottage', location: 'Jinja, Uganda', price: 68, rating: '4.89', tag: 'Near the lake', isFavorite: true, image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=85' },
  { name: 'The Olive Studio', location: 'Fort Portal, Uganda', price: 95, rating: '4.95', tag: 'Quiet retreat', isFavorite: false, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85' },
  { name: 'Riverstone Sanctuary', location: 'Jinja, Uganda', price: 140, rating: '5.0', tag: 'Guest favorite', isFavorite: false, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=85' },
  { name: 'Boma Heritage Loft', location: 'Entebbe, Uganda', price: 105, rating: '4.91', tag: 'Private garden', isFavorite: true, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85' },
  { name: 'Acacia Garden Suite', location: 'Kampala, Uganda', price: 76, rating: '4.87', tag: 'River views', isFavorite: false, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85' },
  { name: 'Misty Ridge Bungalow', location: 'Kabale, Uganda', price: 118, rating: '4.96', tag: 'Guest favorite', isFavorite: false, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85' },
  { name: 'Victoria Breeze Cabin', location: 'Entebbe, Uganda', price: 89, rating: '4.99', tag: 'Quiet retreat', isFavorite: false, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=85' },
  { name: 'Sunbird Eco Lodge', location: 'Fort Portal, Uganda', price: 125, rating: '4.88', tag: 'Near the lake', isFavorite: false, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85' },
]

export default function ListingGrid() {
  const [listings, setListings] = useState(initialListings)
  const [showFavorites, setShowFavorites] = useState(false)
  const visibleListings = showFavorites ? listings.filter((listing) => listing.isFavorite === true) : listings

  const toggleFavorite = (name) => {
    setListings((currentListings) => currentListings.map((listing) =>
      listing.name === name ? { ...listing, isFavorite: !listing.isFavorite } : listing,
    ))
  }

  return (
    <section className="mt-16 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div><span className="text-xs font-bold text-[#7C3AED] tracking-[1.5px] uppercase">Handpicked for you</span><h2 className="text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-1">Stays with a little soul</h2></div>
        <div className="inline-flex items-center gap-3"><button aria-pressed={showFavorites} className="bg-[#EDE9FE] dark:bg-[#302452] text-[#7C3AED] hover:bg-[#DDD6FE] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm" onClick={() => setShowFavorites((value) => !value)} type="button"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span><span>Favorites</span></button><span className="text-sm font-medium text-[#64748B] dark:text-[#A6AEC0]">{visibleListings.length} homes</span></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">{visibleListings.map((listing) => <ListingCard key={listing.name} listing={listing} onToggleFavorite={() => toggleFavorite(listing.name)} />)}</div>
    </section>
  )
}
