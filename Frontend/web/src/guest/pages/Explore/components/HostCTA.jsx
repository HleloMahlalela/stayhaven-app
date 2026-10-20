export default function HostCTA() {
  return (
    <section className="my-16 w-full bg-[#171B28] rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[380px] shadow-lg text-white">
      <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center items-start space-y-5">
        <div className="w-12 h-12 bg-[#7C3AED] rounded-2xl flex items-center justify-center text-white shadow-sm"><span className="material-symbols-outlined text-[24px]">calendar_today</span></div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white tracking-tight">Have a place worth sharing?</h2>
        <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">Join thousands of welcoming hosts worldwide. We make listing simple and help you manage every stay.</p>
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"><a className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors" href="#"><span>Start hosting</span><span className="material-symbols-outlined text-[18px]">arrow_forward</span></a><a className="text-[#A78BFA] hover:text-white transition-colors text-sm font-medium" href="#">Want to list with us?</a></div>
      </div>
      <div className="overflow-hidden w-full h-full min-h-[300px] md:min-h-full"><img alt="Cozy host interior" className="w-full h-full object-cover block" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85" /></div>
    </section>
  )
}
