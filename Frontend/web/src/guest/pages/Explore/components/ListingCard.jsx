import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ListingCard({ listing, onToggleFavorite }) {
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(listing.isFavorite)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('stayhaven-favorites') || '{}')
      if (Object.prototype.hasOwnProperty.call(saved, listing.name)) setFavorite(saved[listing.name])
    } catch { /* Ignore malformed saved favorites. */ }
  }, [listing.name])
  return (
    <div role="link" tabIndex={0} onClick={() => navigate("/details", { state: { listing } })} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); navigate("/details", { state: { listing } }) } }} className="bg-white dark:bg-[#171B28] rounded-[32px] overflow-hidden border border-gray-100 dark:border-[#2A3040] shadow-sm hover:shadow-md transition-shadow flex flex-col group">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[32px]">
        {listing.image ? <img alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" src={listing.image} /> : <div className="h-full w-full bg-slate-100 dark:bg-slate-800" aria-label="No listing photo" />}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0F172A] shadow-sm">{listing.tag}</span>
        <button aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={favorite} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm cursor-pointer hover:bg-white transition-transform active:scale-95" onClick={(event) => { event.preventDefault(); event.stopPropagation(); const next = !favorite; setFavorite(next); try { const saved = JSON.parse(localStorage.getItem('stayhaven-favorites') || '{}'); localStorage.setItem('stayhaven-favorites', JSON.stringify({ ...saved, [listing.name]: next })) } catch { localStorage.setItem('stayhaven-favorites', JSON.stringify({ [listing.name]: next })) }; onToggleFavorite(next) }} type="button"><span className={`material-symbols-outlined text-[18px] ${favorite ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`} style={{ fontVariationSettings: favorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span></button>
      </div>
        <div className="p-4 flex flex-col flex-grow justify-between"><div><h3 className="font-bold text-base text-[#0F172A] dark:text-white truncate group-hover:text-[#7C3AED] transition-colors">{listing.name}</h3><p className="text-sm text-[#64748B] dark:text-[#A6AEC0] mt-0.5 truncate">{listing.location}</p></div><div className="flex justify-between items-center mt-3 pt-2"><div className="font-bold text-[#0F172A] dark:text-white text-base">{listing.currency || 'BWP'} {listing.price} <span className="text-xs text-[#64748B] dark:text-[#A6AEC0] font-normal">/ night</span></div></div></div>
    </div>
  )
}
