import { initialListings } from '../../../../guest/data/listings'
const listings = [
  { ...initialListings[6], host: 'Sarah K.', tone: 'purple' },
  { ...initialListings[7], host: 'David M.', tone: 'blue' },
  { ...initialListings[8], host: 'Talia N.', tone: 'amber' },
]

export default function AwaitingListings() {
  return (
    <section className="rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9]">Listings awaiting approval</h2>
          <p className="mt-0.5 text-sm text-[#64748B] dark:text-[#94A3B8]">Review host submissions</p>
        </div>
        <a className="shrink-0 text-sm font-semibold text-[#7C3AED] hover:underline dark:text-[#8B5CF6]" href="/appadmin/listings">View all</a>
      </div>
      <div>
        {listings.map((listing, index) => (
          <div key={listing.name} className={`flex items-center justify-between gap-3 py-5 ${index < listings.length - 1 ? 'border-b border-[#F1F5F9] dark:border-[#1E2A45]' : ''}`}>
            <div className="flex min-w-0 items-center gap-4">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${listing.tone === 'purple' ? 'bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#8B5CF6]' : listing.tone === 'blue' ? 'bg-[#DBEAFE] text-[#1E40AF] dark:bg-[#1E3A5F] dark:text-[#60A5FA]' : 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#3F2E0A] dark:text-[#F59E0B]'}`}>
                <HouseIcon />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">{listing.name}</div>
                <div className="mt-0.5 text-[13px] text-[#64748B] dark:text-[#94A3B8]">{listing.host} · {listing.location}</div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button className="rounded-full border-0 bg-[#EDE9FE] px-4 py-2 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE] dark:bg-[#2A1F4E] dark:text-[#A78BFA] dark:hover:bg-[#3B2D6E]" type="button">Review</button>
              <ChevronIcon />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HouseIcon() {
  return <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" /></svg>
}

function ChevronIcon() {
  return <svg className="h-4 w-4 shrink-0 text-[#94A3B8]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
}
