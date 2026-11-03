import { useEffect, useState } from 'react'

const dateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
const dateKey = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

export default function CalendarGrid({ currentDate, selectedDate = null, minimumDate, onSelect }) {
  const [calendarMonth, setCalendarMonth] = useState(() => currentDate || new Date())
  const currentDateKey = currentDate ? dateKey(currentDate) : ''

  useEffect(() => {
    if (currentDate) setCalendarMonth(currentDate)
  }, [currentDateKey])

  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay()
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate()
  const calendarCells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
  while (calendarCells.length % 7) calendarCells.push(null)

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button type="button" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} aria-label="Previous month" className="p-1 text-[22px] text-[#7C3AED]">‹</button>
        <span className="text-base font-bold text-gray-950 dark:text-white">{calendarMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} aria-label="Next month" className="p-1 text-[22px] text-[#7C3AED]">›</button>
      </div>
      <div className="mb-2 flex">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`} className="w-[14.28%] text-center text-xs font-semibold text-gray-500 dark:text-[#94A3B8]">{day}</span>)}
      </div>
      <div className="flex flex-wrap">
        {calendarCells.map((day, index) => {
          const date = day === null ? null : new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day)
          const disabled = !date || (minimumDate !== undefined && dateOnly(date) < dateOnly(minimumDate))
          const selected = date !== null && selectedDate !== null && dateOnly(date) === dateOnly(selectedDate)
          const today = date !== null && dateOnly(date) === dateOnly(new Date())
          return <button key={index} type="button" disabled={disabled} onClick={() => date && onSelect(date)} aria-pressed={selected} aria-label={date?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} className={`h-10 w-[14.28%] items-center justify-center ${selected ? 'rounded-full bg-violet-100 dark:bg-[#4A3F70]' : ''} ${disabled ? 'text-gray-300 dark:text-gray-600' : selected ? 'font-bold text-violet-700 dark:text-[#D0BCFF]' : today ? 'font-bold text-[#7C3AED]' : 'text-gray-900 dark:text-white'}`}>
            {day ?? ''}
          </button>
        })}
      </div>
    </div>
  )
}
