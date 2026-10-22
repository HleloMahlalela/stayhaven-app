import { useTheme } from '../context/ThemeContext'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  
  // Check if we are on an admin page
  const isAdmin = location.pathname.startsWith('/houseadmin') || location.pathname === '/listings'
  
  const links = isAdmin
    ? [['/houseadmin/dashboard', 'Dashboard', 'dashboard'], ['/listings', 'Listings', 'view_list'], ['/houseadmin/bookings', 'Bookings', 'event']]
    : [['/', 'Explore', 'explore'], ['/bookings', 'Bookings', 'event'], ['/reviews', 'Reviews', 'star']]

  return (
    <>
      <header className="w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] sticky top-0 z-50">
        <div className="relative flex items-center justify-between w-full py-5 max-w-[1440px] mx-auto px-6 lg:px-12">
          <Link className="flex items-center gap-2 md:gap-3 shrink-0 z-10" to={isAdmin ? "/houseadmin/dashboard" : "/"}>
            <div className="w-8 h-8 rounded-[10px] bg-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            </div>
            <span className="font-bold tracking-tight text-[16px] md:text-[18px] text-[#0F172A] dark:text-white">StayHaven</span>
          </Link>
          
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center bg-white dark:bg-[#171B28] border border-[#E2E8F0] dark:border-[#2A3040] shadow-sm rounded-full p-1 gap-1 z-10 text-sm">
            {links.map(([to, label]) => (
              <NavLink key={label} to={to} className={({ isActive }) => `${isActive ? 'bg-[#EDE9FE] dark:bg-[#302452] text-[#7C3AED] dark:text-[#8B5CF6] font-semibold' : 'text-[#64748B] dark:text-[#A6AEC0] hover:text-[#0F172A] dark:hover:text-white font-medium'} px-4 py-2 rounded-full whitespace-nowrap transition-colors`}>{label}</NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-3 md:gap-4 shrink-0 z-10">
            <button aria-label="Toggle dark mode" onClick={toggleTheme} className="flex w-9 h-9 rounded-full items-center justify-center text-[#64748B] dark:text-[#A6AEC0] hover:text-[#0F172A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors" type="button">
              <span className="material-symbols-outlined text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            {isAdmin ? (
              <button className="hidden md:block bg-white dark:bg-[#141B2D] border border-[#7C3AED] dark:border-[#1E2A45] text-[#7C3AED] dark:text-white px-5 py-2 rounded-full font-semibold hover:bg-[#F8FAFC] dark:hover:border-[#8B5CF6] transition-colors whitespace-nowrap text-sm" type="button">Sign out</button>
            ) : (
              <Link className="hidden md:block bg-[#7C3AED] text-white px-4 py-2 rounded-full font-medium hover:bg-[#6D28D9] transition-colors whitespace-nowrap text-sm shadow-sm" to="/login">Sign in</Link>
            )}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isAdmin ? 'bg-[#7C3AED] text-white' : 'bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED]'}`}>
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <nav aria-label="Mobile navigation" className="fixed bottom-4 left-4 right-4 z-50 md:hidden h-16 rounded-[32px] border border-[#E2E8F0] dark:border-[#2A3040] bg-white dark:bg-[#141B2D] shadow-lg px-2">
        <div className="mx-auto flex h-full items-center justify-around">
          {links.map(([to, label, icon]) => (
            <NavLink key={label} to={to} className={({ isActive }) => `flex min-w-[76px] items-center justify-center gap-1 rounded-full px-3 py-2 text-xs transition-colors ${isActive ? 'bg-[#EDE9FE] dark:bg-[#1E2A45] text-[#7C3AED] dark:text-[#A78BFA]' : 'text-[#64748B] dark:text-[#A6AEC0]'}`}>
              <span className="material-symbols-outlined text-[21px]">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
