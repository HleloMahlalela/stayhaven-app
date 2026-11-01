import { useState } from 'react'

export default function DarkInfoPanel() {
  const [open, setOpen] = useState(false)
  return <aside className="w-full lg:w-[35%] bg-[#0F172A] border border-[#1E2A45] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
    <div className="relative"><div className="flex items-center justify-between mb-8"><div className="w-12 h-12 rounded-full bg-[#1E2A45] flex items-center justify-center text-white"><span className="material-symbols-outlined text-[22px]">notifications</span></div><span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" aria-label="Notifications active" /></div>
      <h2 className="text-[28px] font-extrabold leading-[34px] tracking-tight text-white mb-4">Stay on top of every arrival.</h2><p className="text-[15px] leading-relaxed text-[#94A3B8]">Guests receive automatic email and SMS confirmations before check-in.</p>
    </div><div className="relative pt-8 mt-4"><button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#A78BFA]">Manage notifications →</button></div>
    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-lg rounded-3xl bg-white p-6 text-gray-900 dark:bg-[#141B2D] dark:text-white"><div className="mb-4 flex justify-between"><h3 className="text-xl font-bold">Customer messages</h3><button onClick={() => setOpen(false)}>✕</button></div><div className="space-y-3 text-sm"><p className="rounded-xl bg-gray-50 p-3 dark:bg-[#0A0E1A]">Maya Thompson: Could we check in a little early?</p><p className="rounded-xl bg-gray-50 p-3 dark:bg-[#0A0E1A]">Daniel Kim: Thank you for the local recommendations!</p></div><input placeholder="Write a reply..." className="mt-4 w-full rounded-xl border p-3 dark:bg-[#0A0E1A]"/><button onClick={() => setOpen(false)} className="mt-3 rounded-full bg-[#7C3AED] px-5 py-2 font-semibold text-white">Send reply</button></div></div>}
  </aside>
}
