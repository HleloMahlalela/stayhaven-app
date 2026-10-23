import HouseAdminTable from './components/HouseAdminTable'

export default function HouseAdmins() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F8F9FA] px-6 pb-16 pt-10 text-[#0F172A] transition-colors dark:bg-[#0A0E1A] dark:text-[#F1F5F9] lg:px-12">
      <div className="mx-auto w-full max-w-[1360px]">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#8B5CF6]">APP ADMIN WORKSPACE</p>
          <h1 className="mb-2.5 text-4xl font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-white md:text-[42px]">House admin accounts</h1>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8]">Verify, manage, or suspend house administrator access.</p>
        </header>
        <HouseAdminTable />
      </div>
    </main>
  )
}
