const listings = [
  { name: 'Acacia Garden House', owner: 'Sarah K.', timing: 'Submitted 2h ago', status: 'Pending', iconBg: 'bg-[#F3E8FF] dark:bg-[#2A1F4E]', iconColor: 'text-[#7C3AED] dark:text-[#8B5CF6]' },
  { name: 'Moonrise Cottage', owner: 'David M.', timing: 'Submitted 5h ago', status: 'Pending', iconBg: 'bg-[#DBEAFE] dark:bg-[#1E3A5F]', iconColor: 'text-[#1E40AF] dark:text-[#60A5FA]' },
  { name: 'The Olive Rooms', owner: 'Talia N.', timing: 'Flagged yesterday', status: 'Review', iconBg: 'bg-[#FEF3C7] dark:bg-[#3F2E0A]', iconColor: 'text-[#92400E] dark:text-[#FBBF24]' },
]

export default function ListingTable() {
  return (
    <section aria-label="Listing approvals" className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:rounded-xl dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <div className="hidden items-center justify-between border-b border-[#F1F5F9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8] dark:border-[#1E2A45] dark:bg-[#0A0E1A] sm:flex">
        <div className="w-5/12 text-left">Property/Guest</div>
        <div className="w-4/12 text-left">Details</div>
        <div className="w-3/12 text-right">Status and actions</div>
      </div>
      <div className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">
        {listings.map((listing) => <ListingRow key={listing.name} listing={listing} />)}
      </div>
    </section>
  )
}

function ListingRow({ listing }) {
  const flagged = listing.status === 'Review'
  return (
    <article className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-slate-50/50 dark:hover:bg-[#1E2A45]/30 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3.5 sm:w-5/12">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] ${listing.iconBg} ${listing.iconColor}`}><HouseIcon /></div>
        <span className="text-[15px] font-bold text-[#0F172A] dark:text-[16px] dark:font-semibold dark:text-[#F1F5F9]">{listing.name}</span>
      </div>
      <div className="pl-[58px] text-[14px] text-[#64748B] dark:text-[#94A3B8] sm:w-4/12 sm:pl-0">{listing.owner} · {listing.timing}</div>
      <div className="flex items-center justify-end gap-3 pl-[58px] sm:w-3/12 sm:pl-0">
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${flagged ? 'bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#3F2E0A] dark:text-[#FBBF24]' : 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#3F2E0A] dark:text-[#FBBF24]'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${flagged ? 'bg-[#7C3AED] dark:bg-[#FBBF24]' : 'bg-[#92400E] dark:bg-[#FBBF24]'}`} />{listing.status}
        </span>
        <button className="whitespace-nowrap rounded-full border-0 bg-[#EDE9FE] px-4 py-1.5 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE] dark:bg-[#2A1F4E] dark:px-5 dark:py-2 dark:text-[#A78BFA] dark:hover:bg-[#3B2B6D]" type="button">{flagged ? 'Manage' : 'Review'}</button>
      </div>
    </article>
  )
}

function HouseIcon() {
  return <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" /></svg>
}
