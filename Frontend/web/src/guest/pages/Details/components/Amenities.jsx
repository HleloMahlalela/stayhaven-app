const amenities = [
  ['wifi', 'Fast Wi-Fi'], ['local_parking', 'Free parking'], ['restaurant', 'Breakfast included'],
  ['desk', 'Private workspace'], ['shield', '24-hour security'], ['yard', 'Private garden'],
]

export default function Amenities() {
  return <section>
    <h2 className="mb-4 text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">What this place offers</h2>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {amenities.map(([icon, label]) => <div key={label} className="flex items-center gap-3.5 rounded-[24px] border border-[#E5E7EB] bg-white p-3.5 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#A78BFA]"><span className="material-symbols-outlined text-[20px]">{icon}</span></span><span className="text-sm font-medium text-[#0F172A] dark:text-[#F1F5F9]">{label}</span></div>)}
    </div>
  </section>
}
