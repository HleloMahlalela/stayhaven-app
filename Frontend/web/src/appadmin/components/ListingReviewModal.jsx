import ListingImageGallery from './ListingImageGallery'

const extraGalleryImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLN7Qd8PnnUWrIA9rC6RBmBgA-EN0o3ppip4vhI6O_zeT3dqprE9bs0w90VmaCH3hEnmQDbaSrdSOk2RNcuSeoOvTf5r8ZStGpY1NUKjyBWI7rZLSDRlgI8BzmuKbD3Un9zwIULLUVlbc_Vi9POmOiBR0Aav9ojHMbSRvwur9tOKXVXIhvxQ9_isgSu8avLv61iP0x49QbyzZUdbnbRdD3gEZfOxVHEmAWppE9WqS6e9r4ucQKrfZS',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCu70KxE9IMZVzAZYVilAnfYVOBdk9Tp6mD6n3JgF4xqWqq09irtvQj87fLz9Zqgfmo8ctWNW9FK_jfXr795dgqQNDL0zEoxgjgjvaUNGyBxpGF_69Q6EBm5CtRabHlROaig3v7h8tGKWfsgt67ZvtqqU_oEREDE4qSWaI-Qqdj5N1kY-qkHF2uAnUYWatiApSrcvx136iRaVV4CM8LaHw9P5xZCfwkxel9t1efL0H7SkCEjschcvmO',
]
const statusOptions = ['Pending', 'Active', 'Suspended']
const money = (amount) => `BWP ${Number(amount || 0).toLocaleString()}`

export default function ListingReviewModal({ listing, onClose, onStatusChange }) {
  const gallery = listing.images?.length ? listing.images : [listing.image, ...extraGalleryImages].filter(Boolean)
  const host = listing.owner || listing.host

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section aria-labelledby="listing-review-title" aria-modal="true" className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-[#141B2D] sm:p-7" role="dialog">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Listing review</p><h2 id="listing-review-title" className="mt-1 text-2xl font-bold text-[#0F172A] dark:text-white">{listing.name}</h2><p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">{listing.location}</p></div>
          <button aria-label="Close listing review" className="rounded-full p-2 text-[#64748B] hover:bg-slate-100 dark:hover:bg-[#1E2A45]" onClick={onClose} type="button"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        <ListingImageGallery name={listing.name} images={gallery} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Detail label="Location" value={listing.location} /><Detail label="Price per night" value={`${money(listing.price)} / night`} />
          <Detail label="Listing tag" value={listing.tag || '—'} /><Detail label="Host" value={host || '—'} />
          {onStatusChange && <label className="rounded-2xl bg-[#F8FAFC] p-4 dark:bg-[#0A0E1A]"><span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Listing status</span><select aria-label={`Change status for ${listing.name}`} className="mt-1 block w-full rounded-lg bg-transparent text-sm text-[#0F172A] outline-none focus:ring-2 focus:ring-[#7C3AED] dark:text-[#F1F5F9]" value={listing.status || 'Pending'} onChange={(event) => onStatusChange(listing.id, event.target.value)}>{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>}
        </div>
      </section>
    </div>
  )
}

function Detail({ label, value }) {
  return <div className="rounded-2xl bg-[#F8FAFC] p-4 dark:bg-[#0A0E1A]"><p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</p><p className="mt-1 text-sm text-[#0F172A] dark:text-[#F1F5F9]">{value}</p></div>
}
