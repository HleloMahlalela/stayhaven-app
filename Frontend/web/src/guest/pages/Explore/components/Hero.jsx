export default function Hero() {
  return (
    <section className="w-full h-[520px] relative rounded-[32px] overflow-hidden flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16">
      <img alt="Warm atmospheric guesthouse sanctuary" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=2000&q=85" />
      <div className="bg-black/40 absolute inset-0" />
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <div className="bg-black/30 backdrop-blur-md text-white/90 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-white/20 inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" /><span>Stay somewhere memorable</span></div>
        <h1 className="text-[32px] md:text-[48px] font-bold text-white tracking-tight max-w-2xl leading-tight mb-4">Find a place that feels like yours.</h1>
        <p className="text-white/80 text-[16px] md:text-[20px] max-w-xl mx-auto font-normal">Thoughtful guesthouses, local hosts and stays worth remembering all in one place.</p>
      </div>
    </section>
  )
}
