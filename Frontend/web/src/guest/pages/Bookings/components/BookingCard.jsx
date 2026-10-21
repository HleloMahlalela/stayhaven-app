const surfaceClasses = 'bg-white dark:bg-[#171b28]'

export default function BookingCard({ booking, past = false }) {
  if (past) {
    return (
      <article className="flex items-center justify-between gap-4 overflow-hidden rounded-[32px] bg-[#f2f3ff]/60 p-6 dark:bg-[#171b28]/60">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#e2e7ff] text-[#7b7487] dark:bg-[#262a37] dark:text-[#958ea0]">
            <span className="material-symbols-outlined text-3xl">hotel</span>
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-[#131b2e] dark:text-[#dfe2f3]">{booking.name}</h2>
            <p className="text-sm text-[#7b7487] dark:text-[#958ea0]">{booking.location} · Stayed {booking.dates}</p>
          </div>
        </div>
        <button type="button" className="shrink-0 text-sm font-medium text-[#630ed4] hover:underline dark:text-[#d0bcff]">View Receipt</button>
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
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate text-xl font-bold tracking-tight text-[#131b2e] dark:text-[#dfe2f3]">{booking.name}</h2>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-semibold text-[#166534] dark:bg-[#0f3d24] dark:text-[#4ade80]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />{booking.status}
            </span>
          </div>
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
          <a href="#" className="inline-flex shrink-0 items-center gap-1 pl-2 text-sm font-semibold text-[#630ed4] transition-colors hover:text-[#5e5c6e] dark:text-[#d0bcff] dark:hover:text-[#ccbef8]">Details <span className="material-symbols-outlined text-lg">arrow_forward</span></a>
        </div>
      </div>
    </article>
  )
}
