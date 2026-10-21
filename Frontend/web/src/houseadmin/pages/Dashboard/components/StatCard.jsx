const stats = [
  { label: 'Active listings', value: '4', note: '+1 this month', icon: 'view_list' },
  { label: 'Upcoming stays', value: '12', note: 'Next: tomorrow', icon: 'calendar_month' },
  { label: 'Occupancy', value: '86%', note: '+8.2%', icon: 'group' },
  { label: 'Guest rating', value: '4.91', note: 'From 128 reviews', icon: 'star' },
]

export default function StatCard({ stat }) {
  return <article className="bg-white dark:bg-[#141B2D] rounded-[24px] md:rounded-[32px] border border-[#E5E7EB] dark:border-[#1E2A45] p-6 shadow-sm dark:shadow-[0_8px_24px_-4px_rgba(139,92,246,0.08)] flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4"><span className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">{stat.label}</span><div className="w-10 h-10 rounded-xl bg-[#EDE9FE] dark:bg-[#1E2A45] flex items-center justify-center text-[#7C3AED] dark:text-[#8B5CF6]"><span className="material-symbols-outlined text-[20px]">{stat.icon}</span></div></div>
    <div><div className="text-[32px] font-extrabold text-[#0F172A] dark:text-[#F1F5F9] leading-tight mb-1">{stat.value}</div><div className="text-[13px] font-semibold text-[#16A34A] dark:text-[#4ADE80]">{stat.note}</div></div>
  </article>
}

export { stats }
