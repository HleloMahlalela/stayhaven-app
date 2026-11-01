const stars = [1, 2, 3, 4, 5]

export default function ReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm dark:border-[#2A3040] dark:bg-[#171B28] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <img src={review.image || 'https://images.unsplash.com/photo-1542314831-c6a4d4952bb2?w=100'} alt={`${review.property} property`} className="h-16 w-16 shrink-0 rounded-md object-cover" />
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-[#0F172A] dark:text-white">{review.name}</h3>
            {review.location && <p className="mt-0.5 text-xs text-[#64748B] dark:text-[#A6AEC0]">{review.location}</p>}
            <p className="mt-0.5 text-sm text-[#64748B] dark:text-[#A6AEC0]">Stayed at {review.property} · {review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#F59E0B]" aria-label={`${review.rating} out of 5 stars`}>
          {stars.map((star) => <span key={star} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>)}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#475569] dark:text-[#CBD5E1]">{review.body}</p>
    </article>
  )
}
