import { resolveAssetUrl } from '../../../../services/api'

export default function ImageGallery({ listing }) {
  const galleryImages = (Array.isArray(listing?.images) ? listing.images : []).map((src) => ({ src: resolveAssetUrl(src), alt: listing?.name || listing?.title || 'Property photo' }))
  if (!galleryImages.length) return null
  return (
    <section aria-label="Property photos" className="relative flex h-[200px] gap-3 overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white p-3 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] sm:h-[280px]">
      <div className="group relative min-w-0 flex-1 overflow-hidden rounded-xl">
        <img src={galleryImages[0].src} alt={galleryImages[0].alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="flex w-[28%] min-w-[78px] flex-col gap-3 sm:w-[30%]">
        {galleryImages.slice(1, 3).map((image, index) => <div className="group relative min-h-0 flex-1 overflow-hidden rounded-xl" key={`${image.src}-${index}`}><img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />{index === 1 && galleryImages.length > 3 && <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">+{galleryImages.length - 3}</span>}</div>)}
      </div>
    </section>
  )
}
