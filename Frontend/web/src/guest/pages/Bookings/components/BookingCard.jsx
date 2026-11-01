import { Link } from 'react-router-dom'

const surfaceClasses = 'bg-white dark:bg-[#171b28]'

export default function BookingCard({ booking, past = false, onDelete }) {
  if (past) {
    return (
      <article className="flex items-center justify-between gap-4 overflow-hidden rounded-[32px] bg-[#f2f3ff]/60 p-6 dark:bg-[#171b28]/60">
        <div className="flex min-w-0 items-center gap-4">
          <img src={booking.image} alt={booking.imageAlt} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-[#131b2e] dark:text-[#dfe2f3]">{booking.name}</h2>
            <p className="text-sm text-[#7b7487] dark:text-[#958ea0]">{booking.location} · Stayed {booking.dates}</p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={`group flex h-auto flex-col overflow-hidden rounded-[32px] shadow-sm transition-all duration-300 hover:shadow-md sm:h-[220px] sm:flex-row ${surfaceClasses}`}>
      <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-full sm:w-2/5">
        <img src={booking.image} alt={booking.imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#131b2e] shadow-sm backdrop-blur-sm dark:bg-[#0a0e1a]/80 dark:text-[#dfe2f3]">
          <span className="material-symbols-outlined text-sm text-[#7c3aed] dark:text-[#a078ff]">{booking.icon}</span>{booking.room}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-6">
        <div>
          <h2 className="truncate text-xl font-bold tracking-tight text-[#131b2e] dark:text-[#dfe2f3]">{booking.name}</h2>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#5e5c6e] dark:text-[#cbc3d7]">
            <span className="material-symbols-outlined text-lg text-[#7b7487] dark:text-[#958ea0]">location_on</span>{booking.location}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-[#e2e7ff]/60 p-3 sm:mt-0 dark:bg-[#262a37]/60">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4e0f5] text-[#630ed4] dark:bg-[#313442] dark:text-[#d0bcff]"><span className="material-symbols-outlined">calendar_today</span></div>
            <div className="flex min-w-0 flex-col">
              <span className="font-semibold text-[#131b2e] dark:text-[#dfe2f3]">{booking.dates}</span>
              <span className="truncate text-xs text-[#7b7487] dark:text-[#958ea0]">{booking.nights} nights · Check-in after {booking.checkIn}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 pl-2"><Link to="/details" state={{ listing: booking }} className="inline-flex items-center gap-1 text-sm font-semibold text-[#630ed4] transition-colors hover:text-[#5e5c6e] dark:text-[#d0bcff] dark:hover:text-[#ccbef8]">Details <span className="material-symbols-outlined text-lg">arrow_forward</span></Link><button type="button" onClick={onDelete} className="text-sm font-semibold text-[#7C3AED] hover:underline dark:text-[#A78BFA]">Cancel</button></div>
        </div>
      </div>
    </article>
  )
}
