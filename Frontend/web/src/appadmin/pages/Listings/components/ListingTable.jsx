import { useMemo, useState } from 'react'
import ListingReviewModal from '../../../components/ListingReviewModal'
import { useAppAdminData } from '../../../data/AppAdminDataContext'

const statusOptions = ['Pending', 'Active', 'Suspended']

export default function ListingTable({ filter = 'All' }) {
  const { listings, setListings } = useAppAdminData()
  const [reviewing, setReviewing] = useState(null)
  const visibleListings = useMemo(() => filter === 'All' ? listings : listings.filter((listing) => listing.status === filter), [filter, listings])

  const changeStatus = (id, status) => {
    setListings((items) => items.map((item) => item.id === id ? { ...item, status } : item))
    setReviewing((item) => item?.id === id ? { ...item, status } : item)
  }

  return (
    <>
      <section aria-label="Listing approvals" className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:rounded-xl dark:border-[#1E2A45] dark:bg-[#141B2D]">
        <div className="flex flex-col gap-3 border-b border-[#F1F5F9] px-5 py-4 dark:border-[#1E2A45] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{visibleListings.length} {visibleListings.length === 1 ? 'listing' : 'listings'}</p>
        </div>
        <div className="hidden items-center justify-between border-b border-[#F1F5F9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8] dark:border-[#1E2A45] dark:bg-[#0A0E1A] sm:flex">
          <div className="w-5/12 text-left">Property</div><div className="w-4/12 text-left">Details</div><div className="w-3/12 text-right">Status and actions</div>
        </div>
        <div className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">
          {visibleListings.map((listing) => <ListingRow key={listing.id} listing={listing} onStatusChange={changeStatus} onReview={() => setReviewing(listing)} />)}
          {visibleListings.length === 0 && <p className="px-6 py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">{filter === 'All' ? 'No data available.' : 'No listings have this status.'}</p>}
        </div>
      </section>
      {reviewing && <ListingReviewModal listing={reviewing} onClose={() => setReviewing(null)} onStatusChange={changeStatus} />}
    </>
  )
}

function ListingRow({ listing, onStatusChange, onReview }) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)

  return (
    <article className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-slate-50/50 dark:hover:bg-[#1E2A45]/30 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3.5 sm:w-5/12">
        <img src={listing.image} alt={`${listing.name} thumbnail`} className="h-11 w-11 shrink-0 rounded-xl object-cover" />
        <span className="text-[15px] font-bold text-[#0F172A] dark:text-[16px] dark:font-semibold dark:text-[#F1F5F9]">{listing.name}</span>
      </div>
      <div className="pl-[58px] text-[14px] text-[#64748B] dark:text-[#94A3B8] sm:w-4/12 sm:pl-0">{listing.owner} &#8226; {listing.timing}</div>
      <div className="flex flex-wrap items-center justify-end gap-3 pl-[58px] sm:w-3/12 sm:pl-0">
        <div className="relative">
          <button
            aria-label={`Status for ${listing.name}`}
            aria-haspopup="listbox"
            aria-expanded={statusMenuOpen}
            className={`inline-flex min-w-[5.5rem] cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold outline-none transition-colors hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${statusClass(listing.status)}`}
            type="button"
            onClick={() => setStatusMenuOpen((open) => !open)}
            onKeyDown={(event) => { if (event.key === 'Escape') setStatusMenuOpen(false) }}
          >
            {listing.status}
          </button>
          {statusMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 min-w-36 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-1.5 text-left shadow-lg shadow-slate-900/10" role="listbox" aria-label={`Change status for ${listing.name}`}>
              {statusOptions.map((status) => (
                <button
                  key={status}
                  aria-selected={listing.status === status}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#1F2937] transition-colors hover:bg-[#F3F4F6] focus:bg-[#F3F4F6] focus:outline-none ${listing.status === status ? 'bg-[#F9FAFB]' : ''}`}
                  role="option"
                  type="button"
                  onClick={() => { onStatusChange(listing.id, status); setStatusMenuOpen(false) }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="whitespace-nowrap rounded-full border-0 bg-[#EDE9FE] px-4 py-1.5 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE] dark:bg-[#2A1F4E] dark:px-5 dark:py-2 dark:text-[#A78BFA] dark:hover:bg-[#3B2B6D]" type="button" onClick={onReview}>Review</button>
      </div>
    </article>
  )
}

function statusClass(status) {
  if (status === 'Active') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
  if (status === 'Suspended') return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
  return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
}

