import ListingImageGallery from './ListingImageGallery'

const money = (amount) => `BWP ${Number(amount || 0).toLocaleString()}`

export default function ListingReviewModal({ listing, onClose }) {
  const gallery = Array.isArray(listing.images) ? listing.images : []
  const host = typeof listing.owner === 'string' ? listing.owner : listing.owner?.fullName || listing.host?.fullName || listing.host?.name || listing.hostName || '—'

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
        </div>
      </section>
    </div>
  )
}

function Detail({ label, value }) {
  return <div className="rounded-2xl bg-[#F8FAFC] p-4 dark:bg-[#0A0E1A]"><p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</p><p className="mt-1 text-sm text-[#0F172A] dark:text-[#F1F5F9]">{value}</p></div>
}
