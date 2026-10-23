import ListingTable from './components/ListingTable'

export default function Listings() {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
        <header className="mb-6">
          <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#8B5CF6]">APP ADMIN WORKSPACE</div>
          <h1 className="text-[32px] sm:text-[40px] font-extrabold leading-tight tracking-tight mt-2 text-[#0F172A] dark:text-[#F1F5F9]">Listing approvals</h1>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8] mt-2">Approve submissions and suspend listings that need attention.</p>
        </header>
        <ListingTable />
      </div>
    </main>
  )
}
