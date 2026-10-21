import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const linkStyle = ({ isActive }) => `px-5 py-2 rounded-full whitespace-nowrap transition-colors ${isActive ? 'bg-[#EDE9FE] dark:bg-[#232A3C] text-[#7C3AED] dark:text-[#A78BFA] font-semibold' : 'text-[#64748B] dark:text-[#CBC3D7] hover:text-[#0F172A] dark:hover:text-white font-medium'}`

export default function AdminNavbar() {
  const { theme, toggleTheme } = useTheme()
  return <>
    <header className="w-full bg-[#F8F9FA] dark:bg-[#0C1324] sticky top-0 z-40 border-b border-transparent dark:border-[#494454]/30">
      <div className="flex items-center justify-between w-full py-5 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <Link className="flex items-center gap-2 md:gap-3 shrink-0" to="/houseadmin/dashboard">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center text-white"><span className="material-symbols-outlined text-[18px]">home</span></div>
          <span className="font-bold tracking-tight text-[16px] md:text-[18px] text-[#0F172A] dark:text-white">StayHaven</span>
        </Link>
        <nav aria-label="Admin navigation" className="hidden md:flex items-center bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#494454]/50 shadow-sm rounded-full p-1 gap-1 text-sm">
          <NavLink to="/houseadmin/dashboard" className={linkStyle}>Dashboard</NavLink>
          <NavLink to="/houseadmin/listings" className={linkStyle}>Listings</NavLink>
          <NavLink to="/houseadmin/bookings" className={linkStyle}>Bookings</NavLink>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="w-10 h-10 rounded-full bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#494454]/50 flex items-center justify-center text-[#64748B] dark:text-[#CBC3D7]" type="button"><span className="material-symbols-outlined text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span></button>
          <Link className="hidden sm:block px-4 py-2 text-sm font-medium rounded-full bg-white dark:bg-[#141B2D] border border-[#E5E7EB] dark:border-[#494454]/50 text-[#0F172A] dark:text-white" to="/login">Sign out</Link>
          <div className="w-9 h-9 rounded-full bg-[#7C3AED] flex items-center justify-center text-white"><span className="material-symbols-outlined text-[20px]">person</span></div>
        </div>
      </div>
    </header>
    <nav aria-label="Admin mobile navigation" className="fixed bottom-4 left-4 right-4 z-50 md:hidden h-16 rounded-[32px] border border-[#E2E8F0] dark:border-[#2A3040] bg-white dark:bg-[#141B2D] shadow-lg px-2">
      <div className="mx-auto flex h-full items-center justify-around">{[['dashboard','Dashboard'],['view_list','Listings'],['event','Bookings']].map(([icon,label], i) => <NavLink key={label} to={['/houseadmin/dashboard','/houseadmin/listings','/houseadmin/bookings'][i]} className={({isActive})=>`flex min-w-[76px] items-center justify-center gap-1 rounded-full px-3 py-2 text-xs ${isActive?'bg-[#EDE9FE] dark:bg-[#1E2A45] text-[#7C3AED] dark:text-[#A78BFA]':'text-[#64748B] dark:text-[#A6AEC0]'}`}><span className="material-symbols-outlined text-[21px]">{icon}</span><span>{label}</span></NavLink>)}</div>
    </nav>
  </>
}
