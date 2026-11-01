import { useState } from 'react'

export default function BookingSidebar({ price = 850, discount = 50, rating = '4.92' }) {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState('2')

  const nights = checkInDate && checkOutDate
    ? Math.ceil((new Date(`${checkOutDate}T00:00:00`) - new Date(`${checkInDate}T00:00:00`)) / (1000 * 60 * 60 * 24))
    : 1
  const validNights = Number.isFinite(nights) && nights > 0 ? nights : 1
  const subtotal = price * validNights
  const appliedDiscount = validNights >= 2 ? discount : 0
  const total = subtotal - appliedDiscount
  const dateInputClass = 'h-full min-w-0 w-full bg-transparent px-2 text-sm font-medium text-[#0F172A] dark:text-[#F1F5F9]'

  return <aside className="w-full self-start lg:sticky lg:top-28 lg:w-[34%]">
    <section className="rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] dark:border-[#1E2A45] dark:bg-[#141B2D] dark:shadow-2xl">
      <div className="flex items-baseline justify-between"><div><span className="text-[32px] font-extrabold leading-tight text-[#0F172A] dark:text-[#F1F5F9]">P{price}</span><span className="text-base text-[#64748B] dark:text-[#94A3B8]"> / night</span></div><div className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#94A3B8]"><span className="material-symbols-outlined text-[16px] text-[#7C3AED] dark:text-[#8B5CF6]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><b className="text-[#0F172A] dark:text-[#F1F5F9]">{rating}</b><span>(86)</span></div></div>
      <div className="mt-5 space-y-3.5">
        <div>
          <div className="mb-1 grid grid-cols-2 text-[12px] font-semibold tracking-wider text-[#64748B] dark:text-[#94A3B8]"><label htmlFor="check-in-date">CHECK-IN</label><label htmlFor="check-out-date" className="pl-3">CHECK-OUT</label></div>
          <div className="flex h-11 items-center justify-between rounded-lg border border-gray-300 p-2 dark:border-[#1E2A45]">
            <input id="check-in-date" aria-label="Check-in date" type="date" value={checkInDate} onChange={(event) => setCheckInDate(event.target.value)} max={checkOutDate || undefined} className={dateInputClass} />
            <span aria-hidden="true" className="h-6 border-l border-gray-300 dark:border-[#1E2A45]" />
            <input id="check-out-date" aria-label="Check-out date" type="date" value={checkOutDate} onChange={(event) => setCheckOutDate(event.target.value)} min={checkInDate || undefined} className={dateInputClass} />
          </div>
        </div>
        <label className="block"><span className="mb-1 block text-[12px] font-semibold tracking-wider text-[#64748B] dark:text-[#94A3B8]">GUESTS</span><input id="guest-count" aria-label="Guests" type="number" min="1" max="10" value={guests} onChange={(event) => setGuests(event.target.value)} className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-[#0F172A] dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]" /></label>
      </div>
      <button type="button" onClick={() => window.alert(`Reservation details:\nCheck-in: ${checkInDate || 'Not selected'}\nCheck-out: ${checkOutDate || 'Not selected'}\nNights: ${validNights}\nGuests: ${guests || '1'}\nTotal: P${total}`)} className="mt-5 w-full rounded-full bg-[#7C3AED] py-3.5 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]">Reserve this stay</button>
      <p className="mt-2.5 text-center text-xs text-[#64748B] dark:text-[#94A3B8]">You won't be charged yet</p>
      <div className="my-5 border-t border-[#E5E7EB] dark:border-[#1E2A45]" />
      <div className="space-y-2.5 text-sm text-[#64748B] dark:text-[#94A3B8]"><div className="flex justify-between"><span>P{price} x {validNights} nights</span><span className="text-[#0F172A] dark:text-[#F1F5F9]">P{subtotal}</span></div><div className="flex justify-between"><span>Discount</span><span className="text-[#0F172A] dark:text-[#F1F5F9]">{appliedDiscount > 0 ? `-P${appliedDiscount}` : 'P0'}</span></div></div>
      <div className="my-4 border-t border-[#E5E7EB] dark:border-[#1E2A45]" />
      <div className="flex justify-between text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9]"><span>Total</span><span className="text-[#7C3AED] dark:text-[#C4B5FD]">P{total}</span></div>
    </section>
  </aside>
}
