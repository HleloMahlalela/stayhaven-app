import { Link } from 'react-router-dom'

export default function UpcomingBookings({ bookings = [] }) {
  const upcoming = bookings.filter((booking) => String(booking.status).toLowerCase() === 'confirmed').slice(0, 5)
  return <section className="w-full lg:w-[65%] bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#1E2A45] rounded-[24px] p-6 sm:p-8 shadow-sm">
    <div className="flex items-center justify-between pb-6"><div><h2 className="text-xl md:text-[22px] font-bold">Upcoming bookings</h2><p className="text-sm text-[#64748B] mt-1">Your next guest arrivals</p></div><Link className="text-sm font-semibold text-[#7C3AED]" to="/houseadmin/bookings">View all →</Link></div>
    {upcoming.length ? upcoming.map((booking) => {
      const guest = booking.guest || {}
      const listing = booking.listing || {}
      const name = guest.name || guest.fullName || guest.email || 'Guest'
      const checkIn = booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'Dates not set'
      const checkOut = booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : ''
      return <article key={booking._id || booking.id} className="py-4 border-t flex items-center justify-between gap-4"><div className="min-w-0"><div className="font-bold truncate">{name}</div><div className="text-sm text-[#64748B] truncate">{listing.title || listing.name || 'Stay'} · {listing.location || ''}</div></div><div className="text-right text-sm"><div className="font-semibold">{checkIn}{checkOut ? ` – ${checkOut}` : ''}</div><div className="text-[#64748B] capitalize">{booking.status}</div></div></article>
    }) : <p className="border-t py-6 text-sm text-[#64748B]">No upcoming bookings.</p>}
  </section>
}
