import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Amenities from './components/Amenities'
import BookingSidebar from './components/BookingSidebar'
import ImageGallery from './components/ImageGallery'

export default function Details() {
  return <div className="min-h-screen pb-24 bg-[#F8F9FA] font-sans text-[#0F172A] antialiased dark:bg-[#0A0E1A] dark:text-[#F1F5F9] md:pb-0">
    <main className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-4 sm:px-8 lg:px-16 lg:py-10 md:pb-0">
      <div className="mb-6"><Link to="/explore" className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white"><span className="material-symbols-outlined text-[18px]">arrow_back</span>Back to explore</Link></div>
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="w-full space-y-10 lg:w-[66%]">
          <ImageGallery />
          <section>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-[40px] sm:leading-[48px]">Lavender House</h1>
            <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 text-sm text-[#64748B] dark:text-[#94A3B8]"><span className="material-symbols-outlined text-[17px] text-[#7C3AED] dark:text-[#A78BFA]">location_on</span><span className="font-medium text-[#0F172A] dark:text-[#F1F5F9]">Kampala, Uganda</span><span>·</span><span>Nakasero Hill neighborhood</span></div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm"><span className="material-symbols-outlined text-[17px] text-[#7C3AED] dark:text-[#A78BFA]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><b className="text-[#0F172A] dark:text-[#F1F5F9]">4.92</b><span className="text-[#64748B] dark:text-[#94A3B8]">· 86 reviews ·</span><span className="rounded-full bg-[#EDE9FE] px-2 py-0.5 text-xs font-semibold text-[#7C3AED] dark:bg-[#2A1F4E] dark:text-[#C4B5FD]">Guest favorite</span></div>
            <div className="my-5 border-t border-[#E5E7EB] dark:border-[#1E2A45]" /><p className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">4 guests · 2 beds · 1 private bathroom</p>
          </section>
          <section><h2 className="mb-3 text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">About this guesthouse</h2><p className="text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8]">A carefully hosted retreat with warm interiors, peaceful shared spaces, and everything needed for a comfortable stay. Enjoy local recommendations from your host and easy access to the best of Kampala.</p></section>
          <Amenities />
          <section className="flex items-center gap-4 rounded-[32px] border border-[#EDE9FE] bg-[#F5F3FF] p-5 dark:border-[#1E2A45] dark:bg-[#141B2D] sm:p-6"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-lg font-bold text-white shadow-sm dark:bg-[#8B5CF6]">AN</div><div className="min-w-0 flex-1"><h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9]">Hosted by Amara</h3><p className="mt-0.5 text-sm text-[#64748B] dark:text-[#94A3B8]">Verified host · Responds within an hour</p></div><button type="button" className="shrink-0 rounded-full border border-[#7C3AED]/30 bg-white px-4 py-2 text-xs font-semibold text-[#7C3AED] transition-colors hover:bg-[#EDE9FE] dark:border-[#1E2A45] dark:bg-[#1E2A45]/60 dark:text-[#C4B5FD] dark:hover:bg-[#1E2A45]">Contact host</button></section>
        </div>
        <BookingSidebar />
      </div>
    </main>
    <Footer />
  </div>
}
