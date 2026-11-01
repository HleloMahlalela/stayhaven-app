import { useEffect, useRef, useState } from 'react'

/** A compact status filter with a circular funnel button and accessible popover. */
export default function ReusableFilterIcon({ options, onFilterChange, selectedOption = options[0] }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button aria-label="Filter rows" aria-haspopup="listbox" aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#7C3AED] shadow-[0_2px_8px_rgba(15,23,42,0.10)] transition-colors hover:bg-[#F5F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 dark:border-[#343A4A] dark:bg-[#141B2D] dark:text-[#A78BFA] dark:hover:bg-[#211A36] dark:focus-visible:ring-offset-[#0A0E1A]"
        onClick={() => setOpen((value) => !value)} type="button">
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path d="M4 5h16l-6.3 7.2v5.2l-3.4 1.8v-7L4 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      </button>
      {open && <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-48 rounded-2xl border border-[#E5E7EB] bg-white p-1.5 shadow-xl dark:border-[#343A4A] dark:bg-[#141B2D]" role="listbox" aria-label="Filter options">
        {options.map((option) => <button aria-selected={selectedOption === option}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${selectedOption === option ? 'bg-[#F3E8FF] font-semibold text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#C4B5FD]' : 'text-[#334155] hover:bg-slate-50 dark:text-[#E2E8F0] dark:hover:bg-[#1E2A45]'}`}
          key={option} onClick={() => { onFilterChange(option); setOpen(false) }} role="option" type="button">
          {option}{selectedOption === option && <span aria-hidden="true" className="ml-3 text-xs">✓</span>}
        </button>)}
      </div>}
    </div>
  )
}
