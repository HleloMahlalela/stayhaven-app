import StatCards from './components/StatCards'
import AwaitingListings from './components/AwaitingListings'
import TrustPanel from './components/TrustPanel'

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] transition-colors dark:bg-[#0A0E1A] dark:text-[#F1F5F9]">
      <main className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-10 sm:px-8 lg:px-12">
        <header className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#8B5CF6]">APP ADMIN WORKSPACE</div>
            <h1 className="mb-2 text-[36px] font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-[42px]">Platform overview</h1>
            <p className="text-[16px] text-[#64748B] dark:text-[#94A3B8]">Manage listings, hosts, and the health of StayHaven.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95" type="button">
            <PlusIcon />
            <span>+ Invite house admin</span>
          </button>
        </header>
        <StatCards />
        <section aria-label="Listings and trust notifications" className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <AwaitingListings />
          <TrustPanel />
        </section>
      </main>
    </div>
  )
}

function PlusIcon() {
  return <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
}
