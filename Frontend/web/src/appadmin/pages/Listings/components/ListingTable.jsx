import { useEffect, useState } from 'react'
import api from '../../../../services/api'

export default function ListingTable() {
  const [listings, setListings] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { api.get('/listings/admin/pending').then(({ data }) => setListings(data)).catch((requestError) => setError(requestError.response?.data?.error?.message || 'Unable to load pending listings.')) }, [])
  async function setStatus(listing, status) {
    try { const { data } = await api.patch(`/listings/${listing._id}/status`, { status }); setListings((items) => items.filter((item) => item._id !== data._id)) }
    catch (requestError) { setError(requestError.response?.data?.error?.message || 'Unable to update listing status.') }
  }
  return <section aria-label="Listing approvals" className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
    {error && <p role="alert" className="p-6 text-red-600">{error}</p>}
    {!error && listings.length === 0 && <p className="p-6 text-[#64748B]">No pending listings.</p>}
    <div className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">{listings.map((listing) => <article key={listing._id} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><h2 className="font-bold">{listing.title}</h2><p className="text-sm text-[#64748B]">{listing.location} · {listing.currency} {listing.price}</p></div><div className="flex gap-2"><button onClick={() => setStatus(listing, 'approved')} className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">Approve</button><button onClick={() => setStatus(listing, 'suspended')} className="rounded-full border px-4 py-2 text-sm font-semibold">Reject</button></div></article>)}</div>
  </section>
}
