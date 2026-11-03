import { useEffect, useState } from 'react'
import api from '../../../services/api'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { api.get('/listings').then(async ({ data: listings }) => { const groups = await Promise.all((Array.isArray(listings) ? listings : []).map(async (listing) => { try { const { data } = await api.get(`/reviews/${listing._id}`); return (Array.isArray(data) ? data : []).map((review) => ({ ...review, listingTitle: listing.title, location: listing.location })) } catch { return [] } })); setReviews(groups.flat()) }).catch(() => setError('Unable to load reviews.')) }, [])
  return <main className="min-h-screen bg-[#F8F9FA] px-4 py-10 dark:bg-[#0A0E1A]"><div className="mx-auto max-w-5xl"><p className="text-xs font-bold uppercase tracking-widest text-violet-600">Guest feedback</p><h1 className="mt-2 text-3xl font-bold">Reviews</h1>{error && <p role="alert" className="mt-6 text-red-600">{error}</p>}{reviews.length ? <div className="mt-8 space-y-4">{reviews.map((review, index) => <article key={review._id || index} className="rounded-2xl border bg-white p-5 dark:border-[#1E2A45] dark:bg-[#141B2D]"><h2 className="font-semibold">{review.listingTitle}</h2><p className="text-sm text-slate-500">{review.location}</p><p className="mt-3">{review.comment || review.body || review.text}</p></article>)}</div> : !error && <p className="mt-8 rounded-2xl border border-dashed p-10 text-center text-slate-500">No reviews yet.</p>}</div></main>
}
