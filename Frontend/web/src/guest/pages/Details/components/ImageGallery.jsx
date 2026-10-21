const images = [
  { alt: 'Sunlit bedroom with a king bed and lavender linens', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbW3onTBm07iVTNQR1qSaPwCnoLzJYKhFhKOzXfzLyQuPxO9BivrIEiV9ZlI6xGLeWl6u-52mhPLfDdjrgowLT7ksAv6cwHoAcrwa3UPFMji4yBqU8eWJidyBGAGVVLLMKeK1cK6wP7eHhynnHal2a8SGENgCEpEHfT7xeawslTYb9RJYxBz818Lx_-qAmj5lAMhZMrgr21Oz3QmRq3WKu3HXZ0pAaPvGg-OH3l_we1e12pLKOU4cg' },
  { alt: 'Serene en-suite bathroom with artisan tile', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLN7Qd8PnnUWrIA9rC6RBmBgA-EN0o3ppip4vhI6O_zeT3dqprE9bs0w90VmaCH3hEnmQDbaSrdSOk2RNcuSeoOvTf5r8ZStGpY1NUKjyBWI7rZLSDRlgI8BzmuKbD3Un9zwIULLUVlbc_Vi9POmOiBR0Aav9ojHMbSRvwur9tOKXVXIhvxQ9_isgSu8avLv61iP0x49QbyzZUdbnbRdD3gEZfOxVHEmAWppE9WqS6e9r4ucQKrfZS' },
  { alt: 'Private garden veranda surrounded by tropical plants', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu70KxE9IMZVzAZYVilAnfYVOBdk9Tp6mD6n3JgF4xqWqq09irtvQj87fLz9Zqgfmo8ctWNW9FK_jfXr795dgqQNDL0zEoxgjgjvaUNGyBxpGF_69Q6EBm5CtRabHlROaig3v7h8tGKWfsgt67ZvtqqU_oEREDE4qSWaI-Qqdj5N1kY-qkHF2uAnUYWatiApSrcvx136iRaVV4CM8LaHw9P5xZCfwkxel9t1efL0H7SkCEjschcvmO' },
]

export default function ImageGallery() {
  return (
    <section aria-label="Property photos" className="relative flex h-[200px] gap-3 overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white p-3 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D] sm:h-[280px]">
      <div className="group relative min-w-0 flex-1 overflow-hidden rounded-xl">
        <img src={images[0].src} alt={images[0].alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="flex w-[28%] min-w-[78px] flex-col gap-3 sm:w-[30%]">
        {images.slice(1).map((image, index) => <div className="group relative min-h-0 flex-1 overflow-hidden rounded-xl" key={image.src}><img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />{index === 1 && <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">+3</span>}</div>)}
      </div>
    </section>
  )
}
