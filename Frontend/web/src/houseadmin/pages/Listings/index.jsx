import { useNavigate } from 'react-router-dom'
import ListingsTable from './components/ListingsTable'

export default function Listings() {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
        <header className="mb-8 flex flex-col">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</span>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-[36px]">Your listings</h1>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-base text-[#64748B] dark:text-[#94A3B8]">Edit, pause, or request a new guesthouse listing.</p>
              <button onClick={() => navigate('/houseadmin/add-listing')} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#6B38D4] to-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95" type="button">
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
