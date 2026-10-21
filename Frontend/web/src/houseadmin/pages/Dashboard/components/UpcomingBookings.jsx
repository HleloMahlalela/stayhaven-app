const bookings = [
  { initials: 'MT', name: 'Maya Thompson', property: 'Lavender House', dates: 'Tomorrow · 3 nights', status: 'Confirmed', avatar: 'bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#A78BFA]' },
  { initials: 'DK', name: 'Daniel Kim', property: 'Casa Sol', dates: 'Jun 18 · 5 nights', status: 'Confirmed', avatar: 'bg-[#FEF3C7] text-[#B45309] dark:bg-[#3F2E0A] dark:text-[#FBBF24]' },
  { initials: 'IO', name: 'Ife Okafor', property: 'The Cloud Villa', dates: 'Jun 21 · 2 nights', status: 'Pending', avatar: 'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#1E3A5F] dark:text-[#60A5FA]' },
]

export default function UpcomingBookings() {
  return <section className="w-full lg:w-[65%] bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#1E2A45] rounded-[24px] p-6 sm:p-8 shadow-sm dark:shadow-[0_8px_24px_-4px_rgba(139,92,246,0.08)]">
    <div className="flex items-center justify-between pb-6"><div><h2 className="text-xl md:text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">Upcoming bookings</h2><p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">Your next guest arrivals</p></div><a className="text-sm font-semibold text-[#7C3AED] dark:text-[#8B5CF6] hover:underline" href="#bookings">View all <span aria-hidden="true">→</span></a></div>
    <div className="flex flex-col">{bookings.map((booking) => <article key={booking.initials} className="py-5 border-t border-[#F1F5F9] dark:border-[#1E2A45] flex items-center justify-between gap-3 sm:gap-4 group">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0"><div className={`w-11 h-11 shrink-0 rounded-full font-bold text-sm flex items-center justify-center ${booking.avatar}`}>{booking.initials}</div><div className="min-w-0"><div className="text-[15px] sm:text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] truncate">{booking.name}</div><div className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] truncate">{booking.property}</div></div></div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0"><div className="text-right"><div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9]">{booking.dates}</div><div className="text-xs sm:text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8]">{booking.status}</div></div><span className="material-symbols-outlined text-[#94A3B8] text-[20px]">chevron_right</span></div>
    </article>)}</div>
  </section>
}
