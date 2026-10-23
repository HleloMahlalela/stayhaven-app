import Footer from '../../../components/Footer'
import Hero from './components/Hero'
import HostCTA from './components/HostCTA'
import ListingGrid from './components/ListingGrid'
import SearchBar from './components/SearchBar'

export default function Explore() {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
        <Hero />
        <SearchBar />
        <ListingGrid />
        <HostCTA />
      </div>
      <Footer />
    </main>
  )
}
