import { useMemo, useState } from 'react'
import ListingImageGallery from '../../../components/ListingImageGallery'
import { getAdminListings, useAppAdminData } from '../../../data/AppAdminDataContext'
const accountActions = [
  { value: 'Approved', label: 'Approve account' },
  { value: 'Suspended', label: 'Suspend account' },
  { value: 'Deleted', label: 'Delete account' },
]

export default function HouseAdminTable({ filter = 'All' }) {
  const { administrators, listings, setAdministrators } = useAppAdminData()
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const visibleAdmins = useMemo(() => filter === 'All' ? administrators : administrators.filter((admin) => admin.status === filter), [administrators, filter])

  const updateStatus = (adminId, status) => {
    setAdministrators((items) => items.map((admin) => admin.id === adminId ? { ...admin, status } : admin))
    setSelectedAdmin((admin) => admin?.id === adminId ? { ...admin, status } : admin)
  }

  return (
    <>
      <section aria-label="House admin accounts" className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:rounded-xl dark:border-[#1E2A45] dark:bg-[#141B2D]">
        <div className="flex flex-col gap-3 border-b border-[#F1F5F9] px-5 py-4 dark:border-[#1E2A45] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{visibleAdmins.length} {visibleAdmins.length === 1 ? 'administrator' : 'administrators'}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px] border-collapse text-left">
            <thead><tr className="border-b border-[#F1F5F9] text-xs font-bold uppercase tracking-wider text-[#94A3B8] dark:border-[#1E2A45] dark:bg-[#0A0E1A]/60 dark:font-semibold">
              <th className="py-4 pl-8 pr-4 dark:w-[41.67%]" scope="col">Administrator</th><th className="px-4 py-4 dark:w-[33.33%]" scope="col">Details</th><th className="py-4 pl-4 pr-8 text-right dark:w-1/4" scope="col">Status and actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">
              {visibleAdmins.map((admin) => <AdminRow key={admin.id} admin={admin} listingCount={getAdminListings(admin, listings).length} onManage={() => setSelectedAdmin(admin)} />)}
              {visibleAdmins.length === 0 && <tr><td className="px-8 py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]" colSpan="3">{filter === 'All' ? 'No data available.' : 'No house admins match this status.'}</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      {selectedAdmin && <ManageAdminModal admin={selectedAdmin} listings={listings} onClose={() => setSelectedAdmin(null)} onStatusChange={updateStatus} />}
    </>
  )
}

function AdminRow({ admin, listingCount, onManage }) {
  return <tr className="transition-colors hover:bg-slate-50/60 dark:hover:bg-[#1E2A45]/20">
    <td className="whitespace-nowrap py-5 pl-8 pr-4"><div className="flex items-center gap-3.5"><span className={`flex h-11 w-11 shrink-0 select-none items-center justify-center rounded-[12px] bg-[#F3E8FF] text-sm font-bold text-[#7C3AED] dark:rounded-full dark:bg-[#2A1F4E] dark:font-semibold dark:text-[#A78BFA]`}>{admin.initials}</span><span className="text-base font-bold text-[#0F172A] dark:font-semibold dark:text-white">{admin.name}</span></div></td>
    <td className="whitespace-nowrap px-4 py-5 text-[15px] text-[#64748B] dark:text-sm dark:text-[#94A3B8]">{listingCount} {listingCount === 1 ? 'listing' : 'listings'}</td>
    <td className="whitespace-nowrap py-5 pl-4 pr-8 text-right"><div className="flex items-center justify-end gap-3"><StatusBadge status={admin.status} /><button className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#EDE9FE] px-4 py-1.5 text-[13px] font-bold text-[#7C3AED] transition-colors hover:bg-purple-100 dark:bg-[#2A1F4E] dark:px-5 dark:text-xs dark:font-medium dark:text-[#A78BFA] dark:hover:bg-[#382a69]" type="button" onClick={onManage}>Manage</button></div></td>
  </tr>
}

function StatusBadge({ status }) {
  const color = status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : status === 'Suspended' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${color}`}>{status}</span>
}

function ManageAdminModal({ admin, listings: allListings, onClose, onStatusChange }) {
  const listings = getAdminListings(admin, allListings)
  const [selectedListing, setSelectedListing] = useState(null)
  const onPropertyClick = (listingId) => setSelectedListing(listings.find((listing) => listing.id === listingId) || null)
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section aria-labelledby="manage-admin-title" aria-modal="true" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-[#141B2D] sm:p-7" role="dialog">
      <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">House admin</p><h2 className="mt-1 text-2xl font-bold text-[#0F172A] dark:text-white" id="manage-admin-title">{admin.name}</h2><p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">{listings.length} {listings.length === 1 ? 'listing' : 'listings'}</p></div><button aria-label="Close manage house admin" className="rounded-full p-2 text-[#64748B] hover:bg-slate-100 dark:hover:bg-[#1E2A45]" onClick={onClose} type="button"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg></button></div>
      <div className="mb-6"><div className="mb-3 flex items-center justify-between gap-3"><h3 className="text-lg font-bold text-[#0F172A] dark:text-white">Listed properties</h3><StatusBadge status={admin.status} /></div>
        {listings.length ? <div className="grid gap-3 sm:grid-cols-2">{listings.map((listing) => <button aria-label={`View details for ${listing.name}`} className="flex cursor-pointer gap-3 rounded-2xl border border-[#E2E8F0] p-3 text-left transition-all hover:border-[#7C3AED] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#343A4A] dark:hover:border-[#A78BFA]" key={listing.id} onClick={() => onPropertyClick(listing.id)} type="button"><img alt={`${listing.name} thumbnail`} className="h-20 w-24 shrink-0 rounded-xl object-cover" src={listing.image} /><span className="min-w-0"><span className="block font-semibold text-[#0F172A] dark:text-white">{listing.name}</span><span className="mt-1 block text-sm text-[#64748B] dark:text-[#94A3B8]">{listing.location}</span><span className="mt-1 block text-sm font-medium text-[#7C3AED]">BWP {listing.price.toLocaleString()} / night</span></span></button>)}</div> : <p className="rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#64748B] dark:bg-[#0A0E1A] dark:text-[#94A3B8]">No property records are linked to this account.</p>}
      </div>
      <div className="border-t border-[#E2E8F0] pt-5 dark:border-[#343A4A]"><label className="block text-sm font-semibold text-[#0F172A] dark:text-white" htmlFor="account-status">Account status</label><select id="account-status" aria-label={`Change account status for ${admin.name}`} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-3 text-[#0F172A] outline-none focus:border-[#7C3AED] dark:border-[#343A4A] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]" value={admin.status} onChange={(event) => onStatusChange(admin.id, event.target.value)}>{accountActions.map((action) => <option key={action.value} value={action.value}>{action.label}</option>)}</select></div>
    </section>
    {selectedListing && <HouseAdminListingDetails listing={selectedListing} onClose={() => setSelectedListing(null)} />}
  </div>
}

function HouseAdminListingDetails({ listing, onClose }) {
  const gallery = listing.images?.length ? listing.images : [listing.image].filter(Boolean)

  return <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section aria-labelledby="house-admin-listing-title" aria-modal="true" className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-[#141B2D] sm:p-7" role="dialog">
      <div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Listing details</p><h2 className="mt-1 text-2xl font-bold text-[#0F172A] dark:text-white" id="house-admin-listing-title">{listing.name}</h2><p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">{listing.location}</p></div><button aria-label="Close listing details" className="rounded-full px-3 py-2 text-xl text-[#64748B] hover:bg-slate-100 dark:hover:bg-[#1E2A45]" onClick={onClose} type="button">×</button></div>
      <ListingImageGallery name={listing.name} images={gallery} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><ListingDetail label="Location" value={listing.location} /><ListingDetail label="Price per night" value={`BWP ${Number(listing.price || 0).toLocaleString()} / night`} /><ListingDetail label="Listing tag" value={listing.tag || '—'} /><div className="sm:col-span-2"><ListingDetail label="Description" value={listing.description || 'No description provided.'} /></div></div>
    </section>
  </div>
}
function ListingDetail({ label, value }) {
  return <div className="rounded-2xl bg-[#F8FAFC] p-4 dark:bg-[#0A0E1A]"><p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</p><p className="mt-1 text-sm text-[#0F172A] dark:text-[#F1F5F9]">{value}</p></div>
}
