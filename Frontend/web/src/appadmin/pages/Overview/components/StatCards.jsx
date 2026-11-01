import { Link } from 'react-router-dom'
import { useAppAdminData } from '../../../data/AppAdminDataContext'

export default function StatCards() {
  const { listings, administrators } = useAppAdminData()
  const pendingListings = listings.filter((listing) => listing.status === 'Pending').length
  const activeAdmins = administrators.filter((admin) => ['Approved', 'Active'].includes(admin.status)).length
  const totalListings = listings.filter((listing) => ['Active', 'Approved'].includes(listing.status)).length
  const stats = [
    { label: 'Pending listings', value: pendingListings, trend: 'Awaiting review', icon: 'document', to: '/appadmin/listings?status=Pending' },
    { label: 'Active house admins', value: activeAdmins, trend: 'Approved or active', icon: 'people', to: '/appadmin/houseadmins' },
    { label: 'Total live listings', value: totalListings, trend: 'Across all house admins', icon: 'house' },
  ]

  return (
    <section aria-label="Platform statistics" className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Card = (
          <article className={`flex min-h-[160px] flex-col justify-between rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] ${stat.to ? 'transition hover:-translate-y-0.5 hover:border-[#C4B5FD] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-[#64748B] dark:text-[#94A3B8]">{stat.label}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#1E2A45] dark:text-[#8B5CF6]">
              <StatIcon name={stat.icon} />
            </span>
          </div>
          <div className="mb-2 mt-4 text-[32px] font-extrabold leading-none text-[#0F172A] dark:text-[#F1F5F9]">{stat.value}</div>
          <div className="text-[13px] font-semibold text-[#16A34A] dark:text-[#4ADE80]">{stat.trend}</div>
          </article>
        )
        return stat.to ? <Link aria-label={`${stat.label}: ${stat.value}. Open details`} className="rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]" key={stat.label} to={stat.to}>{Card}</Link> : <div key={stat.label}>{Card}</div>
      })}
    </section>
  )
}

function StatIcon({ name }) {
  const common = { className: 'h-4 w-4 fill-none stroke-current', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24', 'aria-hidden': true }
  if (name === 'document') return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8m8 4H8m2-8H8" /></svg>
  if (name === 'people') return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  if (name === 'house') return <svg {...common}><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" /></svg>
  return <svg {...common}><path d="m10.29 3.86-8.47 14.1a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.1a2 2 0 0 0-3.42 0Z" /><path d="M12 9v4m0 4h.01" /></svg>
}
