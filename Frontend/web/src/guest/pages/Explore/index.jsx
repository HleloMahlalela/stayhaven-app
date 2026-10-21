import Footer from '../../../components/Footer'
import Hero from './components/Hero'
import HostCTA from './components/HostCTA'
import ListingGrid from './components/ListingGrid'
import SearchBar from './components/SearchBar'

export default function Explore() {
  return (
    <div className="w-full min-h-screen pb-24 md:pb-0 bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-white font-sans antialiased selection:bg-[#EDE9FE] selection:text-[#7C3AED]">
      <main className="w-full max-w-[1440px] mx-auto px-6 lg:px-16 pt-2 pb-24 md:pb-0">
        <Hero />
        <SearchBar />
        <ListingGrid />
        <HostCTA />
      </main>
      <Footer />
    </div>
  )
}
