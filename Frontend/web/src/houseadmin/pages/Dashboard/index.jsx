import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import DarkInfoPanel from './components/DarkInfoPanel'
import StatCard, { makeStats } from './components/StatCard'
import UpcomingBookings from './components/UpcomingBookings'

export default function Dashboard() {
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    api.get('/listings/admin/my-listings').then(({ data }) => {
      const myListings = Array.isArray(data) ? data : []
      setListings(myListings)
    }).catch(() => setListings([]))
    api.get('/bookings/host-bookings').then(({ data }) => setBookings(Array.isArray(data) ? data : [])).catch(() => setBookings([]))
  }, [])
  const stats = makeStats(listings, bookings)
  return <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
      <header className="w-full mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#7C3AED] dark:text-[#8B5CF6]">HOUSE ADMIN WORKSPACE</span>
          <h1 className="text-[32px] sm:text-[40px] font-extrabold leading-tight sm:leading-[48px] tracking-tight text-[#0F172A] dark:text-[#F1F5F9]">House admin dashboard</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-base text-[#64748B] dark:text-[#94A3B8]">Here's what's happening with your guesthouses.</p>
            <button onClick={() => navigate('/houseadmin/add-listing')} type="button" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 shadow-md transition-all self-start sm:self-auto"><span className="material-symbols-outlined text-[18px]">add</span>Request new listing</button>
          </div>
        </div>
      </header>
      <section aria-label="Dashboard statistics" className="w-full px-0 sm:px-4 lg:px-4 mb-8 lg:mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
      </section>
      <section aria-label="Upcoming bookings and notifications" className="w-full px-0 sm:px-4 lg:px-4 pb-8 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start"><UpcomingBookings bookings={bookings} /><DarkInfoPanel /></div>
      </section>
    </div>
  </main>
}
