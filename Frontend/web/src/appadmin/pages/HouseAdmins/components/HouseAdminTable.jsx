const administrators = [
  {
    initials: 'SK', name: 'Sarah Kato', details: '12 listings · Verified',
    avatar: 'bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#A78BFA]',
    status: 'Confirmed',
  },
  {
    initials: 'DM', name: 'David Muwanga', details: '4 listings · Verified',
    avatar: 'bg-[#DBEAFE] text-[#1E40AF] dark:bg-[#1E3A5F] dark:text-[#60A5FA]',
    status: 'Confirmed',
  },
  {
    initials: 'TN', name: 'Talia Namusoke', details: '3 reports · Review required',
    avatar: 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#3F2E0A] dark:text-[#FBBF24]',
    status: 'Review',
  },
]

export default function HouseAdminTable() {
  return (
    <section aria-label="House admin accounts" className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm dark:rounded-xl dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[740px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-xs font-bold uppercase tracking-wider text-[#94A3B8] dark:border-[#1E2A45] dark:bg-[#0A0E1A]/60 dark:font-semibold">
              <th className="py-4 pl-8 pr-4 dark:w-[41.67%]" scope="col">Administrator</th>
              <th className="px-4 py-4 dark:w-[33.33%]" scope="col">Details</th>
              <th className="py-4 pl-4 pr-8 text-right dark:w-1/4" scope="col">Status and actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">
            {administrators.map((admin) => (
              <tr key={admin.initials} className="transition-colors hover:bg-slate-50/60 dark:hover:bg-[#1E2A45]/20">
                <td className="whitespace-nowrap py-5 pl-8 pr-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`flex h-11 w-11 shrink-0 select-none items-center justify-center rounded-[12px] text-sm font-bold dark:h-10 dark:w-10 dark:rounded-full dark:font-semibold ${admin.avatar}`}>
                      {admin.initials}
                    </span>
                    <span className="text-base font-bold text-[#0F172A] dark:font-semibold dark:text-white">{admin.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-5 text-[15px] text-[#64748B] dark:text-sm dark:text-[#94A3B8]">{admin.details}</td>
                <td className="whitespace-nowrap py-5 pl-4 pr-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold dark:font-medium ${admin.status === 'Review' ? 'bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#A78BFA]' : 'bg-[#4ADE80] text-[#064E3B] dark:bg-[#064E3B] dark:text-[#4ADE80]'}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${admin.status === 'Review' ? 'bg-[#7C3AED] dark:bg-[#A78BFA]' : 'bg-[#064E3B] dark:bg-[#4ADE80]'}`} />
                      {admin.status === 'Confirmed' ? <><span className="dark:hidden">Confirmed</span><span className="hidden dark:inline">Active</span></> : 'Review'}
                    </span>
                    <button className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#EDE9FE] px-4 py-1.5 text-[13px] font-bold text-[#7C3AED] transition-colors hover:bg-purple-100 dark:bg-[#2A1F4E] dark:px-5 dark:text-xs dark:font-medium dark:text-[#A78BFA] dark:hover:bg-[#382a69]" type="button">Manage</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
