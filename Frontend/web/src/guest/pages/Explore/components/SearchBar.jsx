export default function SearchBar() {
  return (
    <div className="w-full max-w-[960px] mx-auto -mt-10 relative z-20 bg-white dark:bg-[#171B28] rounded-[32px] md:rounded-full p-3 md:p-2.5 shadow-xl border border-[#E5E7EB] dark:border-[#2A3040] flex flex-col md:flex-row md:items-center">
      <div className="flex items-center gap-4 text-left min-w-0 flex-1 px-2 md:pl-4 cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-[#F8F9FA] dark:bg-[#222839] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#7C3AED] text-[22px]">search</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-bold text-[#0F172A] dark:text-white tracking-[1.5px] uppercase truncate">Location</span>
          <span className="text-[15px] text-[#64748B] dark:text-[#A6AEC0] truncate font-normal">All destinations</span>
        </div>
      </div>
      <div className="w-full h-px my-2 bg-[#E5E7EB] dark:bg-[#343B4C] shrink-0 md:w-px md:h-10 md:my-0" />
      <div className="flex items-center gap-4 text-left min-w-0 flex-1 px-2 md:pl-4 cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-[#F8F9FA] dark:bg-[#222839] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#7C3AED] text-[22px]">calendar_today</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-bold text-[#0F172A] dark:text-white tracking-[1.5px] uppercase truncate">CHECK-IN DATE</span>
          <span className="text-[15px] text-[#64748B] dark:text-[#A6AEC0] truncate font-normal">dd/mm/yyyy</span>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center px-4 shrink-0">
        <span className="material-symbols-outlined text-[#94A3B8] dark:text-[#A6AEC0] text-[24px]">calendar_today</span>
      </div>
      <button className="w-full md:w-auto mt-3 md:mt-0 justify-center bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 shadow-md shrink-0 transition-all" type="button">
        <span className="material-symbols-outlined text-[20px]">search</span><span className="text-[15px]">Search</span>
      </button>
    </div>
  )
}
