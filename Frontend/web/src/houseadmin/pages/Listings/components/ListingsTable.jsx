import { initialListings } from '../../../../guest/data/listings'

const listings = initialListings.slice(0, 3).map((listing, index) => ({
  ...listing,
  city: listing.location,
  bookings: [14, 8, 11][index],
  status: index === 2 ? 'Paused' : 'Active',
  icon: 'house',
  lightTile: ['bg-[#F3E8FF] text-[#7C3AED]', 'bg-[#DBEAFE] text-[#1E40AF]', 'bg-[#FEF3C7] text-[#92400E]'][index],
  darkTile: ['dark:bg-[#2A1F4E] dark:text-[#A78BFA]', 'dark:bg-[#1E3A5F] dark:text-[#93C5FD]', 'dark:bg-[#3F2E0A] dark:text-[#FBBF24]'][index],
}))

function ListingRow({ listing, onManage }) {
  const isActive = listing.status === 'Active'

  return (
    <tr className="transition-colors hover:bg-[#F8FAFC] dark:hover:bg-[#1E2A45]/30">
      <td className="px-5 py-5 sm:px-8">
        <div className="flex items-center gap-4">
          <img src={listing.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=160&q=80'} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
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
          <button onClick={() => onManage(listing)} className="rounded-full bg-[#EDE9FE] px-3 py-1.5 text-xs font-semibold text-[#7C3AED]" type="button">Manage</button>
        </div>
      </td>
    </tr>
  )
}

export default function ListingsTable() {
  const [rows, setRows] = useState(listings)
  const [selected, setSelected] = useState(null)
  const update = (status) => { setRows(current => current.map(row => row.name === selected.name ? { ...row, status } : row)); setSelected(null) }
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
            {rows.map((listing) => <ListingRow key={listing.name} listing={listing} onManage={setSelected} />)}
          </tbody>
        </table>
      </div>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-sm rounded-3xl bg-white p-6 dark:bg-[#141B2D]"><div className="mb-5 flex justify-between"><h2 className="text-xl font-bold">Manage {selected.name}</h2><button onClick={() => setSelected(null)}>✕</button></div><div className="grid gap-3"><button onClick={() => setSelected(null)} className="rounded-xl border p-3 text-left">Edit listing</button><button onClick={() => update(selected.status === 'Active' ? 'Paused' : 'Active')} className="rounded-xl border p-3 text-left">{selected.status === 'Active' ? 'Suspend listing' : 'Activate listing'}</button><button onClick={() => { setRows(rows.filter(r => r.name !== selected.name)); setSelected(null) }} className="rounded-xl border border-red-200 p-3 text-left text-red-600">Delete listing</button></div></div></div>}
    </section>
  )
}
import { useState } from 'react'
