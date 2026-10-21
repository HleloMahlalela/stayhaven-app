const bookings = [
  { initials: 'MT', name: 'Maya Thompson', details: 'Lavender House · Jun 18–21', status: 'Confirmed', avatar: 'bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#A78BFA]' },
  { initials: 'DK', name: 'Daniel Kim', details: 'Casa Sol · Jun 22–27', status: 'Confirmed', avatar: 'bg-[#DBEAFE] text-[#1E40AF] dark:bg-[#1E3A5F] dark:text-[#93C5FD]' },
  { initials: 'IO', name: 'Ife Okafor', details: 'The Cloud Villa · Jun 25–27', status: 'Pending', avatar: 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#3F2E0A] dark:text-[#FBBF24]' },
]

function StatusPill({ status }) {
  const confirmed = status === 'Confirmed'
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${confirmed ? 'bg-[#DCFCE7] text-[#166534] dark:bg-[#0F3D24] dark:text-[#4ADE80]' : 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#3F2E0A] dark:text-[#FBBF24]'}`}>
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${confirmed ? 'bg-[#166534] dark:bg-[#4ADE80]' : 'bg-[#92400E] dark:bg-[#FBBF24]'}`} />
      {status}
    </span>
  )
}

function BookingRow({ booking }) {
  return (
    <div className="flex items-center border-b border-[#F1F5F9] px-4 py-5 transition-colors last:border-0 hover:bg-[#F8FAFC]/70 dark:border-[#1E2A45] dark:hover:bg-[#1E2A45]/30 sm:px-6 dark:sm:px-8 sm:dark:py-6">
      <div className="flex w-[30%] min-w-0 items-center gap-3 sm:gap-3.5">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold dark:h-11 dark:w-11 dark:rounded-full ${booking.avatar}`}>{booking.initials}</div>
        <span className="truncate text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9] sm:text-base">{booking.name}</span>
      </div>
      <div className="w-[45%] min-w-0 truncate pr-2 text-xs text-[#64748B] dark:text-[#94A3B8] sm:text-sm">{booking.details}</div>
      <div className="flex w-[25%] items-center justify-end gap-2 sm:gap-4">
        <StatusPill status={booking.status} />
        <button type="button" className="rounded-full bg-[#EDE9FE] px-3 py-1.5 text-xs font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE] dark:border-[1.5px] dark:border-[#8B5CF6] dark:bg-transparent dark:px-4 dark:text-sm dark:text-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-white">Manage</button>
      </div>
    </div>
  )
}

export default function BookingTable() {
  return (
    <section aria-label="Bookings" className="mt-10 w-full overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] dark:shadow-[0_4px_24px_-2px_rgba(139,92,246,0.06)]">
      <div className="flex items-center border-b border-[#F1F5F9] px-4 py-3.5 dark:border-[#1E2A45] dark:bg-[#0A0E1A] sm:px-6 sm:py-4 sm:dark:px-8">
        <div className="w-[30%] text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] sm:text-xs sm:tracking-[1px]">Guest</div>
        <div className="w-[45%] text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] sm:text-xs sm:tracking-[1px]">Details</div>
        <div className="w-[25%] text-right text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] sm:text-xs sm:tracking-[1px]">Status and actions</div>
      </div>
      <div className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">
        {bookings.map((booking) => <BookingRow key={booking.initials} booking={booking} />)}
      </div>
    </section>
  )
}
