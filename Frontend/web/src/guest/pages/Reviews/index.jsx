import Footer from '../../../components/Footer'
import ReviewCard from './components/ReviewCard'

const reviews = [
  { name: 'Maya Thompson', property: 'Casa Sol', date: 'September 2025', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80', body: 'A beautiful, peaceful stay from start to finish. The space was spotless, thoughtfully designed, and just a short walk from everything we wanted to see. Our host made us feel right at home.' },
  { name: 'Daniel Kim', property: 'The Olive House', date: 'August 2025', rating: 4, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80', body: 'Wonderful location and a lovely home with everything we needed. Check-in was easy and the host was quick to answer our questions. I would happily stay here again.' },
  { name: 'Amara Okafor', property: 'Harbour Light Loft', date: 'July 2025', rating: 5, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&h=96&q=80', body: 'The views were even better than the photos. We loved the comfortable space and the thoughtful local recommendations. It made our weekend feel special.' },
]

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
      <a href="#reviews" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#C4B5FD] hover:text-white">Review guidelines <span className="material-symbols-outlined text-lg">arrow_forward</span></a>
    </aside>
  )
}

export default function Reviews() {
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
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:ring-offset-2 dark:focus:ring-offset-[#0A0E1A]"><span className="material-symbols-outlined text-lg">edit</span>Write a review</button>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => <ReviewCard key={`${review.name}-${review.property}`} review={review} />)}
            </div>
          </section>
          <InfoPanel />
        </div>
      </div>
      <Footer />
    </main>
  )
}
