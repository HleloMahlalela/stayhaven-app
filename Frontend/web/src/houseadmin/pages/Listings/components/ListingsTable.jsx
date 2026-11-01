import { useEffect, useState } from 'react'
import api from '../../../../services/api'

export default function ListingsTable() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { api.get('/listings/host').then(({ data }) => setRows(data)).catch((requestError) => setError(requestError.response?.data?.error?.message || 'Unable to load your listings. Sign in as a house admin and try again.')) }, [])
  return <section aria-label="Your guesthouse listings" className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
    {error && <p role="alert" className="p-6 text-red-600">{error}</p>}
    {!error && rows.length === 0 && <p className="p-6 text-[#64748B]">No listings yet.</p>}
    {rows.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left"><thead className="bg-[#F8FAFC] dark:bg-[#0A0E1A]"><tr><th className="px-5 py-4 text-xs text-[#94A3B8] sm:px-8">PROPERTY</th><th className="px-5 py-4 text-xs text-[#94A3B8] sm:px-8">LOCATION</th><th className="px-5 py-4 text-right text-xs text-[#94A3B8] sm:px-8">STATUS</th></tr></thead><tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">{rows.map((listing) => <tr key={listing._id}><td className="px-5 py-5 font-semibold sm:px-8">{listing.title}</td><td className="px-5 py-5 text-sm text-[#64748B] sm:px-8">{listing.location}</td><td className="px-5 py-5 text-right sm:px-8"><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold capitalize text-violet-700">{listing.status}</span></td></tr>)}</tbody></table></div>}
  </section>
}
