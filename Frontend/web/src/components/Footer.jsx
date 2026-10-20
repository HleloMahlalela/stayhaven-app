export default function Footer() {
  return (
    <footer className="w-full py-8 text-sm text-gray-500 dark:text-[#A6AEC0] border-t border-gray-200 dark:border-[#2A3040] mt-12 bg-white dark:bg-[#0A0E1A]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© 2025 StayHaven, Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a className="hover:text-[#0F172A] dark:hover:text-white transition-colors" href="#">Privacy</a>
          <a className="hover:text-[#0F172A] dark:hover:text-white transition-colors" href="#">Terms</a>
          <a className="hover:text-[#0F172A] dark:hover:text-white transition-colors" href="#">Sitemap</a>
          <a className="hover:text-[#0F172A] dark:hover:text-white transition-colors" href="#">Destinations</a>
        </div>
      </div>
    </footer>
  )
}
