import { useMemo, useState } from 'react'
import Footer from '../../../components/Footer'
import BookingCard from './components/BookingCard'

const currentBookings = [
  { name: 'Lavender House', room: 'King Suite', icon: 'bed', location: 'Nakasero, Kampala, Uganda', dates: 'Jun 18–21', nights: 3, checkIn: '2 PM', status: 'Confirmed', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKxOcmfWVqBLwo3oKwefa5C3GXzZALVa_JvyKC3Ak96F_07unaMcLlXUDDN8GSP35erxDpWMexiZRjiqNvSl99riCKmXQIL9AZT2PSBqP7uew_vhSz1REvUxfFmewJ8Jv0nhlPAKMVqzQA04x7JP58XuHjwraW_rBy61ytjUv0zsCFtoNKSnyoYDp-fk4nBJw7b0B4kfIq547jpdSvE_f4ffiG7YE6TtSxhVv_Qmo', imageAlt: 'Warm, intimate bedroom suite at Lavender House.' },
  { name: 'Acacia Garden Suite', room: 'River View', icon: 'water_lux', location: 'Source of the Nile, Jinja, Uganda', dates: 'Jul 12–16', nights: 4, checkIn: '3 PM', status: 'Confirmed', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7s1J1UyTKhtFqcVx6IcC3tN2-2cwpVLxuNuYTUcvKuTwipqkXsS1pov0EfDbzTBb1XLjE4KcOZYN6e4RoEGjy7XbUKsi5i-JasU7nTLm5RZXJ-b7Kub6QfaVpdbH_qiAOtfx9peCTwCelatXv1SlBQpMSNQ-89ZGWGiIwvf09IETfQvQSdWeS-Kp37nLIrXAV_tIG8MjkKdeh5BNs1c-RgDzckAsjRA_-g9eNuSU', imageAlt: 'Refined boutique riverside bedroom in Jinja.' },
  { name: 'Victoria Breeze Cottage', room: 'Entire Cottage', icon: 'cottage', location: 'Lake Peninsula, Entebbe, Uganda', dates: 'Aug 04–08', nights: 4, checkIn: '2 PM', status: 'Confirmed', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYE7i6V9YljxeSn6Zxczz8XBllDBrAI-_Rwl8PoCAnousWawF5W0Pu-0A_lm2lPIhnhA3C2Ba3EqjFk6RUiLlMKyLOMISjwQbjRUtXKEff9oJ6bQ-Kidd5DgxMwA1OplKs5GRFpvr35WhHLScVLrAiuHUODszXuCJX2KHEMrQnTdp90fyZjUx44pBXnaRqFekhnNsf6BWL0IaYuA6nuTcDaa8QNrfx1E8TfIQRIsE', imageAlt: 'Lakeside cottage bedroom overlooking calm water.' },
  { name: 'Misty Ridge Bungalow', room: 'Highland Lodge', icon: 'landscape', location: 'Lake Bunyonyi, Kabale, Uganda', dates: 'Sep 22–27', nights: 5, checkIn: '1 PM', status: 'Confirmed', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7DHVYiBJSSlFD5wcF-_GawMOhoAh1BhaRO9eUFF6CQKLbrt27S6siA3H8-grQKzyc3KrGnwMFoVGsB5UgZBDBFkiGCxb7fuO8mH_b2zh0AXmfwMU8uTMfMJFFRf0fxX8mnzN1w55VnAIdgWRCBSSunqZKbtB6uSGIIZxgLfRGPWPLXizUb67GVF-eRo5BBmO96Jprs91rvv_wGJgycR9E-rciZUv1xRcVIlKzFoY', imageAlt: 'Highland retreat bedroom with a view of misty green hills.' },
]

const pastBookings = [
  { name: 'Nile Canopy Villa', location: 'Jinja', dates: 'Jan 14–19, 2025' },
  { name: 'Kigali View Pavilion', location: 'Kacyiru', dates: 'Nov 02–07, 2024' },
]

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('current')
  const [search, setSearch] = useState('')
  const visibleCurrent = useMemo(() => currentBookings.filter((booking) => `${booking.name} ${booking.location}`.toLowerCase().includes(search.toLowerCase())), [search])
  const visiblePast = useMemo(() => pastBookings.filter((booking) => `${booking.name} ${booking.location}`.toLowerCase().includes(search.toLowerCase())), [search])

  return (
    <div className="min-h-screen pb-24 md:pb-0 bg-[#f8f9fa] text-[#131b2e] dark:bg-[#0a0e1a] dark:text-[#dfe2f3]">
      <main className="min-h-[calc(100vh-80px)] w-full bg-[#f8f9fa] dark:bg-[#0a0e1a] pb-24 md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-16 lg:py-12">
          <header className="flex flex-col items-start">
            <span className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-[#7c3aed] dark:text-[#d0bcff]">YOUR stays</span>
            <h1 className="text-3xl font-bold tracking-tight text-[#131b2e] dark:text-[#dfe2f3]">Bookings</h1>
            <p className="mt-3 max-w-xl text-base text-[#5e5c6e] dark:text-[#cbc3d7]">Everything you need for your upcoming and previous stays.</p>
          </header>

          <div className="mb-10 mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded-full bg-[#eaedff] p-1 shadow-sm dark:bg-[#171b28]" role="tablist" aria-label="Booking status">
              {['current', 'past'].map((tab) => {
                const selected = activeTab === tab
                const count = tab === 'current' ? 4 : 12
                return <button key={tab} id={`tab-${tab}`} type="button" role="tab" aria-selected={selected} onClick={() => setActiveTab(tab)} className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${selected ? 'bg-white text-[#7c3aed] shadow-sm dark:bg-[#262a37] dark:text-[#d0bcff]' : 'text-[#5e5c6e] hover:text-[#131b2e] dark:text-[#958ea0] dark:hover:text-[#dfe2f3]'}`}>
                  {tab}<span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${selected ? 'bg-[#e4e0f5] text-[#7c3aed] dark:bg-[#4a3f70] dark:text-[#d0bcff]' : 'bg-[#e2e7ff] text-[#5e5c6e] dark:bg-[#313442] dark:text-[#958ea0]'}`}>{count}</span>
                </button>
              })}
            </div>
            <div className="flex items-center gap-3">
              <label className="relative hidden sm:block">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-[#7b7487] dark:text-[#958ea0]">search</span>
                <input value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 w-64 rounded-full bg-white pl-10 pr-4 text-sm text-[#131b2e] shadow-sm placeholder:text-[#7b7487] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 dark:bg-[#171b28] dark:text-[#dfe2f3] dark:placeholder:text-[#958ea0]" placeholder="Search reservations..." aria-label="Search bookings" />
              </label>
              <button type="button" className="flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#4a4455] shadow-sm transition-colors hover:bg-[#f2f3ff] dark:bg-[#171b28] dark:text-[#cbc3d7] dark:hover:bg-[#262a37]"><span className="material-symbols-outlined text-lg">tune</span>Filter</button>
            </div>
          </div>

          {activeTab === 'current' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" role="tabpanel" aria-labelledby="tab-current">
              {visibleCurrent.map((booking) => <BookingCard key={booking.name} booking={booking} />)}
              {visibleCurrent.length === 0 && <p className="text-sm text-[#5e5c6e] dark:text-[#cbc3d7]">No bookings match your search.</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" role="tabpanel" aria-labelledby="tab-past">
              {visiblePast.map((booking) => <BookingCard key={booking.name} booking={booking} past />)}
              {visiblePast.length === 0 && <p className="text-sm text-[#5e5c6e] dark:text-[#cbc3d7]">No bookings match your search.</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
