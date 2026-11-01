import { useMemo, useState } from 'react'
import BookingCard from './components/BookingCard'
import DatePickerCalendar from '../../components/DatePickerCalendar'
import { initialListings } from '../../data/listings'

const makeBooking = (listing, checkInDate, checkOutDate, dates, room, icon) => ({
  ...listing,
  room,
  icon,
  dates,
  checkIn: '2 PM',
  status: 'Confirmed',
  checkInDate,
  checkOutDate,
  nights: (new Date(checkOutDate) - new Date(checkInDate)) / 86400000,
  imageAlt: `${listing.name} in ${listing.location}`,
})

const currentBookings = [
  makeBooking(initialListings[0], '2026-11-12', '2026-11-15', 'Nov 12–15, 2026', 'King Suite', 'bed'),
  makeBooking(initialListings[1], '2026-12-02', '2026-12-06', 'Dec 02–06, 2026', 'River View', 'water_lux'),
  makeBooking(initialListings[2], '2027-01-14', '2027-01-18', 'Jan 14–18, 2027', 'Entire Cottage', 'cottage'),
  makeBooking(initialListings[3], '2027-02-22', '2027-02-27', 'Feb 22–27, 2027', 'Garden Room', 'landscape'),
]

const pastBookings = [
  makeBooking(initialListings[4], '2025-01-14', '2025-01-19', 'Jan 14–19, 2025', 'Guest Suite', 'bed'),
  makeBooking(initialListings[5], '2025-11-02', '2025-11-07', 'Nov 02–07, 2025', 'Loft Suite', 'bed'),
]

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('current')
  const [dateFilter, setDateFilter] = useState('')
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [bookings, setBookings] = useState(currentBookings)
  const matchesDate = (booking) => !dateFilter || booking.checkInDate >= dateFilter
  const visibleCurrent = useMemo(() => bookings.filter(matchesDate), [bookings, dateFilter])
  const visiblePast = useMemo(() => pastBookings.filter(matchesDate), [dateFilter])
  const selectedDateLabel = dateFilter
    ? new Date(`${dateFilter}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] text-[#0F172A] transition-colors pb-24 dark:bg-[#0A0E1A] dark:text-[#F1F5F9] md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-10 pb-12 sm:px-8 lg:px-12 md:pb-16">
        <header className="flex flex-col items-start"><span className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-[#7c3aed] dark:text-[#d0bcff]">YOUR STAYS</span><h1 className="text-3xl font-bold tracking-tight text-[#131b2e] dark:text-[#dfe2f3]">Bookings</h1><p className="mt-3 max-w-xl text-base text-[#5e5c6e] dark:text-[#cbc3d7]">Everything you need for your upcoming and previous stays.</p></header>
        <div className="mb-10 mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-full bg-[#eaedff] p-1 shadow-sm dark:bg-[#171b28]" role="tablist" aria-label="Booking status">
            {['current', 'past'].map((tab) => {
              const selected = activeTab === tab
              const count = tab === 'current' ? bookings.length : pastBookings.length
              return <button key={tab} id={`tab-${tab}`} type="button" role="tab" aria-selected={selected} onClick={() => setActiveTab(tab)} className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${selected ? 'bg-white text-[#7c3aed] shadow-sm dark:bg-[#262a37] dark:text-[#d0bcff]' : 'text-[#5e5c6e] hover:text-[#131b2e] dark:text-[#958ea0] dark:hover:text-[#dfe2f3]'}`}>{tab}<span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${selected ? 'bg-[#e4e0f5] text-[#7c3aed] dark:bg-[#4a3f70] dark:text-[#d0bcff]' : 'bg-[#e2e7ff] text-[#5e5c6e] dark:bg-[#313442] dark:text-[#958ea0]'}`}>{count}</span></button>
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setCalendarOpen((open) => !open)}
                aria-label={dateFilter ? `Filter bookings from ${selectedDateLabel}` : 'Filter bookings by date'}
                aria-expanded={calendarOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-colors hover:bg-gray-50 dark:border-[#1E2A45] dark:bg-[#171b28] dark:hover:bg-[#262a37]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] text-[#7c3aed]">
                  <path d="M4 5h16l-6.2 7.1v5.2l-3.6 1.8v-7L4 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {calendarOpen && (
                <DatePickerCalendar
                  selectedDate={dateFilter ? new Date(`${dateFilter}T00:00:00`) : null}
                  onSelect={(date) => {
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    setDateFilter(`${year}-${month}-${day}`)
                    setCalendarOpen(false)
                  }}
                  onClose={() => setCalendarOpen(false)}
                  className="absolute right-0 top-12 z-50 w-72 max-w-xs"
                />
              )}
            </div>
            {selectedDateLabel && (
              <div className="flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1.5 dark:bg-[#1E2A45]">
                <span className="text-xs font-semibold text-violet-700 dark:text-[#D0BCFF]">{selectedDateLabel}</span>
                <button type="button" onClick={() => setDateFilter('')} aria-label="Clear date filter" className="inline-flex items-center justify-center text-[#7c3aed] dark:text-[#D0BCFF]">
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m7 7 6 6m0-6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {activeTab === 'current' ? <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" role="tabpanel" aria-labelledby="tab-current">
          {visibleCurrent.map((booking) => <BookingCard key={booking.id} booking={booking} onDelete={() => { if (window.confirm(`Delete the booking for ${booking.name}?`)) setBookings((items) => items.filter((item) => item.id !== booking.id)) }} />)}
          {visibleCurrent.length === 0 && <p className="text-sm text-[#5e5c6e] dark:text-[#cbc3d7]">No bookings match the selected date.</p>}
        </div> : <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" role="tabpanel" aria-labelledby="tab-past">
          {visiblePast.map((booking) => <BookingCard key={booking.id} booking={booking} past />)}
          {visiblePast.length === 0 && <p className="text-sm text-[#5e5c6e] dark:text-[#cbc3d7]">No bookings match the selected date.</p>}
        </div>}
      </div>
    </main>
  )
}
