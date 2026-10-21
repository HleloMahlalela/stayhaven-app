export default function DarkInfoPanel() {
  return <aside className="w-full lg:w-[35%] bg-[#0F172A] dark:bg-[#0F172A] border border-[#1E2A45] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
    <div className="relative"><div className="flex items-center justify-between mb-8"><div className="w-12 h-12 rounded-full bg-[#1E2A45] flex items-center justify-center text-white"><span className="material-symbols-outlined text-[22px]">notifications</span></div><span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" aria-label="Notifications active" /></div>
      <h2 className="text-[28px] font-extrabold leading-[34px] tracking-tight text-white mb-4">Stay on top of every arrival.</h2><p className="text-[15px] leading-relaxed text-[#94A3B8]">Guests receive automatic email and SMS confirmations before check-in.</p>
    </div><div className="relative pt-8 mt-4"><a className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#A78BFA] hover:text-white transition-colors" href="#notifications">Manage notifications <span>→</span></a></div>
  </aside>
}
