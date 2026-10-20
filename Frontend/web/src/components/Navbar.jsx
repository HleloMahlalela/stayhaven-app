import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] sticky top-0 z-50">
      <div className="relative flex items-center justify-between w-full py-5 max-w-[1440px] mx-auto px-6 lg:px-12">
        <a className="flex items-center gap-3 shrink-0 z-10" href="#">
          <div className="w-8 h-8 rounded-[10px] bg-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
          </div>
          <span className="font-bold tracking-tight text-[18px] text-[#0F172A] dark:text-white">StayHaven</span>
        </a>
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white dark:bg-[#171B28] border border-[#E2E8F0] dark:border-[#2A3040] shadow-sm rounded-full p-1 gap-1 z-10 text-sm">
          <a aria-current="page" className="bg-[#EDE9FE] dark:bg-[#302452] text-[#7C3AED] font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors" href="/explore">Explore</a>
          <a className="text-[#64748B] dark:text-[#A6AEC0] hover:text-[#0F172A] dark:hover:text-white font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors" href="#">Bookings</a>
          <a className="text-[#64748B] dark:text-[#A6AEC0] hover:text-[#0F172A] dark:hover:text-white font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors" href="#">Reviews</a>
        </nav>
        <div className="flex items-center gap-4 shrink-0 z-10">
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748B] dark:text-[#A6AEC0] hover:text-[#0F172A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span></button>
          <a className="bg-[#7C3AED] text-white px-4 py-2 rounded-full font-medium hover:bg-[#6D28D9] transition-colors whitespace-nowrap text-sm shadow-sm" href="#">Sign in</a>
          <div className="w-9 h-9 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] shrink-0"><span className="material-symbols-outlined text-[20px]">person</span></div>
        </div>
      </div>
    </header>
  )
}
