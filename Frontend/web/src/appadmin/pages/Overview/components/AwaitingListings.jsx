import { useState } from 'react'
import ListingReviewModal from '../../../components/ListingReviewModal'
import { useAppAdminData } from '../../../data/AppAdminDataContext'

export default function AwaitingListings() {
  const { listings, setListings } = useAppAdminData()
  const items = listings.filter((listing) => listing.status === 'Pending')
  const [reviewing, setReviewing] = useState(null)
  const changeStatus = (id, status) => {
    setListings((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    setReviewing((item) => item?.id === id ? { ...item, status } : item)
  }

  return (
    <>
    <section className="rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9]">Listings awaiting approval</h2>
          <p className="mt-0.5 text-sm text-[#64748B] dark:text-[#94A3B8]">Review host submissions</p>
        </div>
        <a className="shrink-0 text-sm font-semibold text-[#7C3AED] hover:underline dark:text-[#8B5CF6]" href="/appadmin/listings">View all</a>
      </div>
      <div>
        {items.map((listing, index) => (
          <div key={listing.name} className={`flex items-center justify-between gap-3 py-5 ${index < items.length - 1 ? 'border-b border-[#F1F5F9] dark:border-[#1E2A45]' : ''}`}>
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#8B5CF6]">
                <HouseIcon />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">{listing.name}</div>
                <div className="mt-0.5 text-[13px] text-[#64748B] dark:text-[#94A3B8]">{listing.owner} · {listing.location}</div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button className="rounded-full border-0 bg-[#EDE9FE] px-4 py-2 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE] dark:bg-[#2A1F4E] dark:text-[#A78BFA] dark:hover:bg-[#3B2D6E]" type="button" onClick={() => setReviewing(listing)}>Review</button>
              <ChevronIcon />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">No pending listings.</p>}
      </div>
    </section>
    {reviewing && <ListingReviewModal listing={reviewing} onClose={() => setReviewing(null)} onStatusChange={changeStatus} />}
    </>
  )
}

function HouseIcon() {
  return <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" /></svg>
}

function ChevronIcon() {
  return <svg className="h-4 w-4 shrink-0 text-[#94A3B8]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
}
