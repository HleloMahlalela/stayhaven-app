import BookingTable from './components/BookingTable'

export default function HouseAdminBookings() {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] text-[#0F172A] transition-colors dark:bg-[#0A0E1A] dark:text-[#F1F5F9]">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-10 sm:px-8 lg:px-16">
        <header className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</span>
          <h1 className="mt-2 text-[32px] font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-[40px] sm:leading-[48px]">Booking management</h1>
          <p className="mt-2 text-base text-[#64748B] dark:text-[#94A3B8]">Manage upcoming stays and guest requests.</p>
        </header>
        <BookingTable />
      </div>
    </main>
  )
}
