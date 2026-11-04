import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../services/api'
import CalendarGrid from '../../../components/CalendarGrid'

export default function BookingSidebar({ listingId, price = 0, discount = 0, discountInterval = 1 }) {
  const navigate = useNavigate()
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [dateTarget, setDateTarget] = useState('checkIn')
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [guests, setGuests] = useState('2')
  const [bookingError, setBookingError] = useState('')

  const nights = checkInDate && checkOutDate
    ? Math.max(1, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)))
    : 1
  const interval = discountInterval || 1
  const subtotal = price * nights
  const appliedDiscount = Math.floor(nights / interval) * discount
  const total = (price * nights) - appliedDiscount
  const formatDate = (date) => date?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) || 'Choose date'
  const firstAvailableDate = new Date()
  firstAvailableDate.setHours(0, 0, 0, 0)
  firstAvailableDate.setDate(firstAvailableDate.getDate() + 1)
  const minimumDate = dateTarget === 'checkOut' && checkInDate
    ? new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate() + 1)
    : firstAvailableDate
  const selectedCalendarDate = dateTarget === 'checkIn' ? checkInDate : checkOutDate
  const openCalendar = (target) => {
    setDateTarget(target === 'checkOut' && !checkInDate ? 'checkIn' : target)
    setCalendarOpen(true)
  }
  const selectDate = (date) => {
    if (dateTarget === 'checkIn') {
      setCheckInDate(date)
      if (checkOutDate && date >= checkOutDate) setCheckOutDate(null)
    } else if (checkInDate && date > checkInDate) {
      setCheckOutDate(date)
    }
    setCalendarOpen(false)
  }
  const reserve = async () => {
    setBookingError('')
    if (!checkInDate || !checkOutDate) {
      setBookingError('Please select check-in and check-out dates.')
      return
    }
    try {
      await api.post('/bookings', {
        listingId: String(listingId),
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guests: Number.parseInt(guests, 10),
      })
      window.alert('Booking Confirmed!')
      navigate('/bookings')
    } catch (error) {
      setBookingError(error.response?.data?.message || 'Unable to complete this booking.')
    }
  }

  return <aside className="relative w-full self-start lg:sticky lg:top-28 lg:w-[34%]">
    <section className="rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] dark:border-[#1E2A45] dark:bg-[#141B2D] dark:shadow-2xl">
      <div className="flex items-baseline justify-between"><div><span className="text-[32px] font-extrabold leading-tight text-[#0F172A] dark:text-[#F1F5F9]">P{price}</span><span className="text-base text-[#64748B] dark:text-[#94A3B8]"> / night</span></div></div>
      <div className="mt-5 space-y-3.5">
        <div className="relative">
          <div className="mb-1 flex">
            <span className="flex-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#94A3B8]">Check-in</span>
            <span className="flex-1 pl-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#94A3B8]">Check-out</span>
          </div>
          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-2 dark:border-[#1E2A45] dark:bg-[#0A0E1A]">
            <button type="button" onClick={() => openCalendar('checkIn')} aria-label="Choose check-in date" className="flex min-w-0 flex-1 items-center justify-between px-1 py-2 text-left">
              <span className="truncate text-xs text-gray-700 dark:text-white">{formatDate(checkInDate)}</span>
              <CalendarIcon />
            </button>
            <span aria-hidden="true" className="mx-1 h-7 border-l border-gray-300 dark:border-[#334155]" />
            <button type="button" onClick={() => openCalendar('checkOut')} aria-label="Choose check-out date" className="flex min-w-0 flex-1 items-center justify-between px-1 py-2 text-left">
              <span className="truncate text-xs text-gray-700 dark:text-white">{formatDate(checkOutDate)}</span>
              <CalendarIcon />
            </button>
          </div>
          {calendarOpen && <div className="absolute left-0 top-full z-50 mt-2 w-[320px] max-w-full">
            <section aria-label={`Select ${dateTarget === 'checkIn' ? 'check-in' : 'check-out'} date`} className="w-full rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-xl dark:border-[#1E2A45] dark:bg-[#141B2D]" role="dialog">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white" />
                <button type="button" onClick={() => setCalendarOpen(false)} aria-label="Close calendar" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1E2A45]"><span className="text-2xl leading-none text-[#94A3B8]">×</span></button>
              </div>
              <p className="mb-3 text-base font-semibold text-gray-900 dark:text-white">Select {dateTarget === 'checkIn' ? 'check-in' : 'check-out'} date</p>
              <CalendarGrid currentDate={selectedCalendarDate || minimumDate} selectedDate={selectedCalendarDate} minimumDate={minimumDate} onSelect={selectDate} />
            </section>
          </div>}
        </div>
        <label className="block"><span className="mb-1 block text-[12px] font-semibold tracking-wider text-[#64748B] dark:text-[#94A3B8]">GUESTS</span><input id="guest-count" aria-label="Guests" type="number" min="1" max="10" value={guests} onChange={(event) => setGuests(event.target.value)} className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-[#0F172A] dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]" /></label>
      </div>
      <button type="button" onClick={reserve} className="mt-5 w-full rounded-full bg-[#7C3AED] py-3.5 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]">Reserve this stay</button>
      {bookingError && <p role="alert" className="mt-2 text-center text-xs text-red-600">{bookingError}</p>}
      <p className="mt-2.5 text-center text-xs text-[#64748B] dark:text-[#94A3B8]">You won't be charged yet</p>
      <div className="my-5 border-t border-[#E5E7EB] dark:border-[#1E2A45]" />
      <div className="space-y-2.5 text-sm text-[#64748B] dark:text-[#94A3B8]"><div className="flex justify-between"><span>P{price} x {nights} nights</span><span className="text-[#0F172A] dark:text-[#F1F5F9]">P{subtotal}</span></div>{appliedDiscount > 0 && <div className="flex justify-between"><span>Discount</span><span className="text-[#0F172A] dark:text-[#F1F5F9]">-P{appliedDiscount}</span></div>}</div>
      <div className="my-4 border-t border-[#E5E7EB] dark:border-[#1E2A45]" />
      <div className="flex justify-between text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9]"><span>Total</span><span className="text-[#7C3AED] dark:text-[#C4B5FD]">P{total}</span></div>
    </section>
  </aside>
}

function CalendarIcon() {
  return <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
}
