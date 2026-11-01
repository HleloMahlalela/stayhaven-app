import { useState } from 'react'

export default function DatePickerCalendar({ onSelect, onClose, className = '', selectedDate = null, modal = false }) {
  const [calendarMonth, setCalendarMonth] = useState(() => selectedDate || new Date())
  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay()
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate()
  const calendarCells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
  while (calendarCells.length % 7) calendarCells.push(null)

  return (
    <section role="dialog" aria-modal={modal} aria-label="Choose a date" className={`w-full rounded-3xl bg-white p-5 shadow-xl dark:bg-[#141B2D] ${className}`}>
      <div className="mb-5 flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} className="text-[#7C3AED]">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h2 className="text-base font-bold text-gray-950 dark:text-white">{calendarMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</h2>
        <button type="button" aria-label="Next month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className="text-[#7C3AED]">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <div className="mb-2 flex">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={`${day}-${index}`} className="w-[14.28%] text-center text-xs font-semibold text-gray-500 dark:text-[#94A3B8]">{day}</span>
        ))}
      </div>
      <div className="flex flex-wrap">
        {calendarCells.map((day, index) => {
          const date = day ? new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day) : null
          const selected = date && selectedDate && date.toDateString() === selectedDate.toDateString()
          return (
            <button
              key={index}
              type="button"
              disabled={!day}
              onClick={() => date && onSelect(date)}
              aria-pressed={Boolean(selected)}
              className={`h-10 w-[14.28%] text-sm text-gray-900 enabled:hover:rounded-full enabled:hover:bg-violet-100 disabled:cursor-default dark:text-white ${selected ? 'rounded-full bg-violet-100 font-bold text-violet-700 dark:bg-[#4A3F70] dark:text-[#D0BCFF]' : ''}`}
            >
              {day ?? ''}
            </button>
          )
        })}
      </div>
      <button type="button" onClick={onClose} className="mt-4 w-full rounded-full bg-violet-100 py-3 font-semibold text-violet-700 dark:bg-[#1E2A45] dark:text-[#A78BFA]">Cancel</button>
    </section>
  )
}
