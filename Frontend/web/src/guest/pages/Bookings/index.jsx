import { useEffect, useState } from 'react'
import api, { resolveAssetUrl } from '../../../services/api'
import { Link } from 'react-router-dom'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { api.get('/bookings/my-bookings').then(({ data }) => setBookings(Array.isArray(data) ? data : [])).catch(() => setError('Unable to load your bookings.')) }, [])
  return <main className="min-h-screen bg-[#F8F9FA] px-4 py-10 text-[#0F172A] dark:bg-[#0A0E1A] dark:text-white"><div className="mx-auto max-w-6xl"><h1 className="text-3xl font-bold">Bookings</h1>{error && <p role="alert" className="mt-6 text-red-600">{error}</p>}{bookings.length ? <div className="mt-8 grid gap-5 md:grid-cols-2">{bookings.map((booking) => { const listing = booking.listing || {}; return <article key={booking._id} className="overflow-hidden rounded-3xl border bg-white dark:border-[#1E2A45] dark:bg-[#141B2D]">{listing.images?.[0] && <img src={resolveAssetUrl(listing.images[0])} alt={listing.title} className="h-48 w-full object-cover" />}<div className="p-5"><h2 className="text-xl font-bold">{listing.title || 'Stay'}</h2><p className="mt-1 text-sm text-slate-500">{listing.location}</p><p className="mt-3 text-sm">{new Date(booking.checkInDate).toLocaleDateString()} – {new Date(booking.checkOutDate).toLocaleDateString()}</p><p className="mt-2 text-sm capitalize">{booking.status}</p><Link to={`/messages?listingId=${listing._id}&bookingId=${booking._id}`} className="mt-4 inline-flex rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white">Message host</Link></div></article> })}</div> : !error && <p className="mt-8 rounded-2xl border border-dashed p-10 text-center text-slate-500">You have no bookings yet.</p>}</div></main>
}
