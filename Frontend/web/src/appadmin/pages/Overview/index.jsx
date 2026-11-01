import StatCards from './components/StatCards'
import AwaitingListings from './components/AwaitingListings'
import TrustPanel from './components/TrustPanel'

export default function Overview() {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
        <header className="mb-8">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#8B5CF6]">APP ADMIN WORKSPACE</div>
            <h1 className="text-[32px] sm:text-[40px] font-extrabold leading-tight tracking-tight mt-2 text-[#0F172A] dark:text-[#F1F5F9]">Platform overview</h1>
            <p className="text-base text-[#64748B] dark:text-[#94A3B8] mt-2">Manage listings, hosts, and the health of StayHaven.</p>
          </div>
        </header>
        <StatCards />
        <section aria-label="Listings and trust notifications" className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <AwaitingListings />
          <TrustPanel />
        </section>
      </div>
    </main>
  )
}
