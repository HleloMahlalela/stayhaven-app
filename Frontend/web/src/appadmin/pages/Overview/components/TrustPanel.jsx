export default function TrustPanel() {
  return (
    <aside className="h-max rounded-[32px] border border-[#1E2A45] bg-[#0F172A] p-6 sm:p-8 dark:border-[#1E2A45]">
      <div className="mb-8 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1E2A45] bg-[#1E293B] text-[#A78BFA]">
          <ShieldIcon />
        </span>
      </div>
      <div>
        <h2 className="mb-4 text-[28px] font-bold leading-tight text-white">Keep the community trusted.</h2>
        <p className="mb-8 text-[16px] leading-relaxed text-[#94A3B8]">Verification alerts and account reports appear here for quick action.</p>
      </div>
      <a className="inline-flex items-center text-sm font-semibold text-[#A78BFA] hover:underline" href="/appadmin/house-admins">Manage notifications →</a>
    </aside>
  )
}

function ShieldIcon() {
  return <svg className="h-6 w-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
}

