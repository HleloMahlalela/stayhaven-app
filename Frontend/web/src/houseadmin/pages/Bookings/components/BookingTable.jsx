import { useEffect, useState } from 'react'
import api from '../../../../services/api'

export default function BookingTable() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { api.get('/bookings/host-bookings').then(({ data }) => setBookings(Array.isArray(data) ? data : [])).catch(() => setError('Unable to load bookings.')) }, [])
  async function manage(booking) {
    const status = String(booking.status).toLowerCase() === 'pending' ? 'confirmed' : 'cancelled'
    if (!window.confirm(`Change this booking to ${status}?`)) return
    try { const { data } = await api.patch(`/bookings/${booking._id}/status`, { status }); setBookings((items) => items.map((item) => item._id === booking._id ? data : item)) }
    catch (requestError) { window.alert(requestError.response?.data?.message || 'Unable to update booking.') }
  }
  return <section aria-label="Bookings" className="mt-10 w-full overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
    <div className="grid grid-cols-[25%_45%_30%] border-b px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8] sm:px-8"><span>Guest</span><span>Details</span><span className="text-right">Status and actions</span></div>
    {error && <p role="alert" className="p-6 text-red-600">{error}</p>}
    {bookings.map((booking) => { const guest = booking.guest || {}; const listing = booking.listing || {}; const name = guest.name || guest.fullName || guest.email || 'Guest'; const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase(); const dates = `${booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : ''} – ${booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : ''}`; return <div key={booking._id} className="grid grid-cols-[25%_45%_30%] items-center border-b px-4 py-5 last:border-0 sm:px-8"><span className="truncate font-semibold">{initials} {name}</span><span className="truncate text-sm text-[#64748B]">{listing.title || 'Stay'} · {listing.location || ''} · {dates}</span><span className="flex items-center justify-end gap-2"><span className="text-xs capitalize">{booking.status}</span><button onClick={() => manage(booking)} type="button" className="rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold text-violet-700">Manage</button></span></div> })}
    {!error && bookings.length === 0 && <p className="p-8 text-center text-sm text-[#64748B]">No bookings yet.</p>}
  </section>
}
