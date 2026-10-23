import { useTheme } from '../context/ThemeContext'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  if (location.pathname.startsWith('/appadmin/')) {
    return <AppAdminNavbar theme={theme} toggleTheme={toggleTheme} pathname={location.pathname} />
  }
  
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

function AppAdminNavbar({ theme, toggleTheme, pathname }) {
  const navLinkClass = (active) => `rounded-full px-4 py-2 text-sm transition-colors ${active
    ? 'bg-[#EDE9FE] font-semibold text-[#7C3AED] dark:bg-[#1E2A45] dark:text-[#8B5CF6]'
    : 'font-medium text-[#64748B] hover:bg-[#F8FAFC] dark:text-[#94A3B8] dark:hover:bg-[#1E2A45] dark:hover:text-[#F1F5F9]'}`

  return (
    <header className="flex h-[80px] w-full shrink-0 items-center justify-between bg-[#F8F9FA] px-6 dark:bg-[#0A0E1A] sm:px-8 lg:px-12">
      <a href="/appadmin/overview" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-white shadow-sm dark:bg-[#8B5CF6]">
          <HouseIcon className="h-5 w-5" />
        </span>
        <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">StayHaven</span>
      </a>
      <nav aria-label="App admin navigation" className="hidden items-center gap-1 rounded-full border border-[#E5E7EB] bg-white p-1.5 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] md:flex">
        <Link className={navLinkClass(pathname === '/appadmin/overview')} to="/appadmin/overview">Overview</Link>
        <Link className={navLinkClass(pathname === '/appadmin/listings')} to="/appadmin/listings">Listings</Link>
        <Link className={navLinkClass(pathname === '/appadmin/houseadmins')} to="/appadmin/houseadmins">House admins</Link>
      </nav>
      <div className="flex items-center gap-3">
        <button aria-label="Toggle dark mode" onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#7C3AED] shadow-sm transition-colors hover:bg-[#F8FAFC] dark:border-[#1E2A45] dark:bg-[#141B2D] dark:text-[#F1F5F9] dark:hover:bg-[#1E2A45]" type="button">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button type="button" className="hidden rounded-full border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-semibold text-[#7C3AED] shadow-sm transition-colors hover:bg-[#F8FAFC] dark:border-[#1E2A45] dark:bg-[#141B2D] dark:text-[#F1F5F9] dark:hover:bg-[#1E2A45] sm:block">Sign out</button>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-sm dark:bg-[#8B5CF6]">
          <UserIcon className="h-5 w-5" />
        </span>
      </div>
    </header>
  )
}

function HouseIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" /></svg>
}

function UserIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" /></svg>
}

function MoonIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
}

function SunIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
}
