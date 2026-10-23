import ListingsTable from './components/ListingsTable'

export default function Listings() {
  return (
    <main className="min-h-[calc(100vh-80px)] w-full bg-[#F8F9FA] text-[#0F172A] transition-colors dark:bg-[#0A0E1A] dark:text-[#F1F5F9]">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-8 sm:px-8 sm:pt-10 lg:px-16">
        <header className="mb-7 flex flex-col gap-5 sm:mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</span>
            <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-[36px]">Your listings</h1>
            <div className="mt-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-base text-[#64748B] dark:text-[#94A3B8]">Edit, pause, or request a new guesthouse listing.</p>
              <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#6B38D4] to-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95" type="button">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Request new listing
              </button>
            </div>
          </div>
        </header>
        <ListingsTable />
      </div>
    </main>
  )
}
