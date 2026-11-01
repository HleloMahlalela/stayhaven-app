import ReviewCard from './components/ReviewCard'
import { useState } from 'react'
import { initialListings } from '../../data/listings'

function InfoPanel() {
  return (
    <aside className="h-fit overflow-hidden rounded-3xl bg-[#171B28] p-7 text-white dark:bg-[#171B28] sm:p-8 lg:p-9">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/20 text-[#C4B5FD]">
        <span className="material-symbols-outlined text-2xl">rate_review</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#C4B5FD]">Your voice matters</p>
      <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">Honest feedback, your way</h2>
      <p className="mt-4 text-sm leading-6 text-[#CBD5E1]">Your reviews help other travelers find a stay they’ll love. Share what stood out, what could be better, and the little details that made your trip memorable.</p>
      <div className="my-7 h-px bg-white/10" />
      <ul className="space-y-4 text-sm text-[#E2E8F0]">
        <li className="flex gap-3"><span className="material-symbols-outlined text-lg text-[#A78BFA]">visibility</span><span>Only your first name is shown publicly.</span></li>
        <li className="flex gap-3"><span className="material-symbols-outlined text-lg text-[#A78BFA]">edit</span><span>You can edit your review at any time.</span></li>
        <li className="flex gap-3"><span className="material-symbols-outlined text-lg text-[#A78BFA]">favorite</span><span>Kind, specific feedback helps hosts grow.</span></li>
      </ul>
    </aside>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [property, setProperty] = useState(initialListings[0].name)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const submitReview = (event) => {
    event.preventDefault()
    const listing = initialListings.find((item) => item.name === property) || initialListings[0]
    const review = {
      id: `review-${Date.now()}`,
      name: 'You',
      property: listing.name,
      location: listing.location,
      image: listing.image,
      date: new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
      rating,
      body: comment.trim(),
    }
    setReviews((currentReviews) => [review, ...currentReviews])
    setIsModalOpen(false)
    setComment('')
  }
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
        <header className="flex flex-col items-start">
          <span className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#D0BCFF]">YOUR EXPERIENCES</span>
          <h1 className="text-3xl font-bold tracking-tight text-[#131B2E] dark:text-[#DFE2F3]">Reviews</h1>
          <p className="mt-3 max-w-xl text-base text-[#5E5C6E] dark:text-[#CBC3D7]">Share your experiences and help make every stay better.</p>
        </header>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
          <section id="reviews" aria-labelledby="your-reviews-heading">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 id="your-reviews-heading" className="text-xl font-bold text-[#131B2E] dark:text-[#DFE2F3]">Your Reviews <span className="ml-1 text-sm font-medium text-[#7B7487] dark:text-[#958EA0]">({reviews.length})</span></h2>
                <p className="mt-1 text-sm text-[#64748B] dark:text-[#A6AEC0]">Your past stays and the stories you shared.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:ring-offset-2 dark:focus:ring-offset-[#0A0E1A]"><span className="material-symbols-outlined text-lg">edit</span>Write a review</button>
            </div>
            <div className="space-y-4">{reviews.length ? reviews.map((review) => <ReviewCard key={review.id || `${review.name}-${review.property}`} review={review} />) : <p className="rounded-2xl border border-dashed p-8 text-center text-[#64748B] dark:border-[#2A3040] dark:text-[#A6AEC0]">No reviews yet. Write your first review!</p>}</div>
          </section>
          <InfoPanel />
        </div>
      </div>
      {isModalOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}>
        <section role="dialog" aria-modal="true" aria-labelledby="write-review-title" className="w-full max-w-lg rounded-3xl bg-white p-6 text-[#0F172A] shadow-2xl dark:bg-[#171B28] dark:text-[#F1F5F9]">
          <div className="mb-5 flex items-center justify-between"><h2 id="write-review-title" className="text-xl font-bold">Write a review</h2><button type="button" aria-label="Close" onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"><span className="material-symbols-outlined">close</span></button></div>
          <form onSubmit={submitReview} className="space-y-4">
            <label className="block text-sm font-semibold">Past stay<select required value={property} onChange={(event) => setProperty(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#E2E8F0] bg-transparent px-3 py-2.5 font-normal dark:border-[#343A4A]">{initialListings.map((listing) => <option key={listing.id} value={listing.name}>{listing.name} · {listing.location}</option>)}</select></label>
            <fieldset><legend className="text-sm font-semibold">Rating</legend><div className="mt-1 flex gap-1" aria-label={`${rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" aria-label={`${star} star${star === 1 ? '' : 's'}`} aria-pressed={rating === star} onClick={() => setRating(star)} className={`text-3xl ${star <= rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}>★</button>)}</div></fieldset>
            <label className="block text-sm font-semibold">Comment<textarea required rows="4" value={comment} onChange={(event) => setComment(event.target.value)} className="mt-1.5 w-full resize-y rounded-xl border border-[#E2E8F0] bg-transparent px-3 py-2.5 font-normal dark:border-[#343A4A]" placeholder="Share what made your stay memorable..." /></label>
            <button type="submit" className="w-full rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white hover:bg-[#6D28D9]">Post review</button>
          </form>
        </section>
      </div>}
    </main>
  )
}
