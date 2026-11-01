import { useState } from 'react'
import DatePickerCalendar from '../../../components/DatePickerCalendar'

const AREAS = ['Gaborone', 'Francistown', 'Maun', 'Kasane', 'Palapye', 'Serowe', 'Mahalapye', 'Molepolole', 'Kanye', 'Mochudi']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const formatDate = (date) => `${String(date.getDate()).padStart(2, '0')} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`

function SearchSection({ label, value, icon, onClick, className = '' }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl px-2 py-2 text-left md:flex-1 md:pl-4 ${className}`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F8F9FA] dark:bg-[#222839]">
        <span className="material-symbols-outlined text-[22px] text-[#7C3AED]">{icon}</span>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[11px] font-bold uppercase tracking-[1.5px] text-[#0F172A] dark:text-white">{label}</span>
        <span className="truncate text-[15px] text-[#64748B] dark:text-[#A6AEC0]">{value}</span>
      </span>
    </button>
  )
}

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('All destinations')
  const [date, setDate] = useState('Select a date')
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const selectDate = (selectedDate) => {
    setDate(formatDate(selectedDate))
    setIsCalendarModalOpen(false)
  }

  return (
    <>
      <div className="relative z-20 mx-auto -mt-10 flex w-full max-w-[960px] flex-col rounded-[32px] border border-[#E5E7EB] bg-white p-3 shadow-xl dark:border-[#2A3040] dark:bg-[#171B28] md:flex-row md:items-center md:rounded-full md:p-2.5">
        <SearchSection label="Location" value={location} icon="location_on" onClick={() => setIsLocationModalOpen(true)} />
        <div aria-hidden="true" className="my-1 h-px shrink-0 bg-[#E5E7EB] dark:bg-[#343B4C] md:my-0 md:h-10 md:w-px" />
        <SearchSection label="Check-in date" value={date} icon="calendar_today" onClick={() => setIsCalendarModalOpen(true)} />
        <button onClick={() => onSearch?.({ location, date })} className="mt-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] px-8 py-3.5 font-semibold text-white shadow-md transition-all hover:opacity-90 md:mt-0 md:w-auto" type="button">
          <span className="material-symbols-outlined text-[20px]">search</span><span className="text-[15px]">Search</span>
        </button>
      </div>

      {isLocationModalOpen && <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 sm:items-center sm:px-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsLocationModalOpen(false) }}>
        <section role="dialog" aria-modal="true" aria-labelledby="choose-area-title" className="w-full rounded-t-3xl bg-white p-5 dark:bg-[#141B2D] sm:max-w-md sm:rounded-3xl">
          <div className="mb-4 flex items-center justify-between"><h2 id="choose-area-title" className="text-lg font-bold text-gray-950 dark:text-white">Choose an area</h2><button type="button" aria-label="Close" onClick={() => setIsLocationModalOpen(false)} className="rounded-full p-1 text-[#94A3B8]"><span className="material-symbols-outlined">close</span></button></div>
          {['All destinations', ...AREAS].map((area) => <button key={area} type="button" onClick={() => { setLocation(area); setIsLocationModalOpen(false) }} className="block w-full border-t border-gray-100 py-4 text-left text-base text-gray-900 dark:border-[#1E2A45] dark:text-white">{area}</button>)}
        </section>
      </div>}

      {isCalendarModalOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCalendarModalOpen(false) }}>
        <DatePickerCalendar modal className="max-w-md" onSelect={selectDate} onClose={() => setIsCalendarModalOpen(false)} />
      </div>}
    </>
  )
}
