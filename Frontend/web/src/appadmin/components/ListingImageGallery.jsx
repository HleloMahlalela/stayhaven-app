import { useState } from 'react'

export default function ListingImageGallery({ name, images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const imageCount = images.length

  if (!imageCount) return null

  const activeImage = images[activeImageIndex]

  return (
    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl">
        <img src={activeImage} alt={`${name} preview`} className="h-64 w-full rounded-2xl object-cover sm:h-80" />
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:content-start">
        {images.map((src, index) => {
          const isActive = index === activeImageIndex
          return <button
            aria-label={`Show listing photo ${index + 1}`}
            aria-pressed={isActive}
            className={`group relative cursor-pointer overflow-hidden rounded-xl transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${isActive ? 'ring-2 ring-[#7C3AED]' : 'opacity-90'}`}
            key={`${src}-${index}`}
            onClick={() => setActiveImageIndex(index)}
            type="button"
          ><img src={src} alt={`${name}, photo ${index + 1}`} className="h-20 w-full object-cover transition-transform group-hover:scale-105 sm:h-[94px]" /></button>
        })}
      </div>
    </div>
  )
}
