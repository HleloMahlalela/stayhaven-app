const listings = [
  { name: 'Lavender House', city: 'Kampala', bookings: 14, status: 'Active', icon: 'house', lightTile: 'bg-[#F3E8FF] text-[#7C3AED]', darkTile: 'dark:bg-[#2A1F4E] dark:text-[#A78BFA]' },
  { name: 'The Cloud Villa', city: 'Jinja', bookings: 8, status: 'Active', icon: 'house', lightTile: 'bg-[#DBEAFE] text-[#1E40AF]', darkTile: 'dark:bg-[#1E3A5F] dark:text-[#93C5FD]' },
  { name: 'Casa Sol', city: 'Entebbe', bookings: 11, status: 'Paused', icon: 'house', lightTile: 'bg-[#FEF3C7] text-[#92400E]', darkTile: 'dark:bg-[#3F2E0A] dark:text-[#FBBF24]' },
]

function ListingRow({ listing }) {
  const isActive = listing.status === 'Active'

  return (
    <tr className="transition-colors hover:bg-[#F8FAFC] dark:hover:bg-[#1E2A45]/30">
      <td className="px-5 py-5 sm:px-8">
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] ${listing.lightTile} ${listing.darkTile}`}>
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>{listing.icon}</span>
          </div>
          <span className="text-base font-semibold text-[#0F172A] dark:text-[#F1F5F9] sm:text-[18px]">{listing.name}</span>
        </div>
      </td>
      <td className="px-5 py-5 text-sm text-[#64748B] dark:text-[#94A3B8] sm:px-8">{listing.city} · {listing.bookings} bookings</td>
      <td className="px-5 py-5 sm:px-8">
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3 ${isActive ? 'bg-[#4ADE80] text-[#064E3B] dark:bg-[#0F3D24] dark:text-[#4ADE80]' : 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#3F2E0A] dark:text-[#FBBF24]'}`}>
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? 'bg-[#064E3B] dark:bg-[#4ADE80]' : 'bg-[#92400E] dark:bg-[#FBBF24]'}`} />
            {listing.status}
          </span>
          <button className="rounded-full bg-[#EDE9FE] px-3 py-1.5 text-xs font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE] dark:border-[1.5px] dark:border-[#8B5CF6] dark:bg-transparent dark:px-4 dark:text-[#8B5CF6] dark:hover:bg-[#8B5CF6]/10 sm:text-sm" type="button">Manage</button>
        </div>
      </td>
    </tr>
  )
}

export default function ListingsTable() {
  return (
    <section aria-label="Your guesthouse listings" className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <colgroup><col className="w-[40%]" /><col className="w-[40%]" /><col className="w-[20%]" /></colgroup>
          <thead className="bg-[#F8FAFC] dark:bg-[#0A0E1A]">
            <tr className="border-b border-[#F1F5F9] dark:border-[#1E2A45]">
              <th className="px-5 py-4 text-xs font-semibold tracking-wider text-[#94A3B8] sm:px-8" scope="col">PROPERTY</th>
              <th className="px-5 py-4 text-xs font-semibold tracking-wider text-[#94A3B8] sm:px-8" scope="col">DETAILS</th>
              <th className="px-5 py-4 text-right text-xs font-semibold tracking-wider text-[#94A3B8] sm:px-8" scope="col">STATUS AND ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">
            {listings.map((listing) => <ListingRow key={listing.name} listing={listing} />)}
          </tbody>
        </table>
      </div>
    </section>
  )
}
