import ListingTable from './components/ListingTable'

export default function Listings() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FA] text-[#0F172A] transition-colors dark:bg-[#0A0E1A] dark:text-[#F1F5F9]">
      <main className="mx-auto flex w-full max-w-[1280px] flex-col justify-start px-6 pb-6 pt-8 sm:px-8 lg:px-10">
        <header className="mb-6">
          <div className="mb-1.5 text-[12px] font-bold uppercase tracking-widest text-[#7C3AED] dark:text-[#8B5CF6]">APP ADMIN WORKSPACE</div>
          <h1 className="mb-1 text-[32px] font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-[#F1F5F9]">Listing approvals</h1>
          <p className="text-[15px] text-[#64748B] dark:text-[#94A3B8]">Approve submissions and suspend listings that need attention.</p>
        </header>
        <ListingTable />
      </main>
    </div>
  )
}
