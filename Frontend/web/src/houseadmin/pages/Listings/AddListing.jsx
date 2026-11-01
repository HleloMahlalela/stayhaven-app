import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'

const cities = ['Gaborone', 'Francistown', 'Maun', 'Kasane', 'Palapye', 'Serowe', 'Mahalapye', 'Molepolole', 'Kanye', 'Mochudi']
const availableAmenities = ['Fast Wi-Fi', 'Free parking', 'Breakfast included', 'Private workspace', '24-hour security', 'Private garden']

export default function AddListing() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [amenities, setAmenities] = useState([])
  const [customAmenity, setCustomAmenity] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    // Keep this object in sync with CreateListingSchema in the API.
    const data = {
      title: String(form.get('title') || '').trim(),
      description: String(form.get('description') || '').trim(),
      location: String(form.get('location') || '').trim(),
      price: Number(form.get('price')),
      discount: Number(form.get('discount') || 0),
      images: Array.from(selectedFiles).map((f, i) => `https://via.placeholder.com/400?text=House+${i + 1}`),
      amenities,
    }
    setSubmitting(true)
    try {
      await api.post('/listings', data)
      navigate('/houseadmin/listings')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to create listing')
    } finally { setSubmitting(false) }
  }

  const inputClass = 'mt-2 w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#1E2A45] dark:bg-[#0A0E1A]'
  return <main className="min-h-screen w-full bg-[#F8F9FA] px-4 py-12 text-[#0F172A] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]"><div className="mx-auto w-full max-w-[1440px]"><section className="mx-auto max-w-3xl rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]"><p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">House admin workspace</p><h1 className="mt-2 text-3xl font-extrabold">Add a listing</h1><p className="mt-2 text-[#64748B] dark:text-[#94A3B8]">Add your guesthouse details and pricing.</p>
    <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
      <label className="block sm:col-span-2">Title<input className={inputClass} name="title" required /></label>
      <label className="block sm:col-span-2">Description<textarea className={inputClass} name="description" required rows="4" /></label>
      <label className="block">Location<select className={inputClass} defaultValue="" name="location" required><option disabled value="">Select a city</option>{cities.map(city => <option key={city}>{city}</option>)}</select></label>
      <label className="block">Price per night<input className={inputClass} min="0" name="price" required type="number" /></label>
      <label className="block">Discount amount<input className={inputClass} defaultValue="0" min="0" name="discount" type="number" /></label>
      <fieldset className="sm:col-span-2"><legend className="font-medium">Amenities</legend><div className="mt-2 grid gap-3 sm:grid-cols-2">{availableAmenities.map((amenity) => <label key={amenity} className="flex items-center gap-2"><input checked={amenities.includes(amenity)} onChange={(event) => setAmenities((current) => event.target.checked ? [...current, amenity] : current.filter((item) => item !== amenity))} type="checkbox" />{amenity}</label>)}</div><div className="mt-4 flex gap-2"><input className={inputClass} value={customAmenity} onChange={e => setCustomAmenity(e.target.value)} placeholder="Add a custom amenity" /><button type="button" className="rounded-lg bg-violet-100 px-4 text-violet-700" onClick={() => { const item=customAmenity.trim(); if(item && !amenities.includes(item)) setAmenities([...amenities,item]); setCustomAmenity('') }}>Add</button></div></fieldset>
      <label className="block sm:col-span-2">Images<input className={inputClass} accept="image/*" multiple onChange={(event) => setSelectedFiles(Array.from(event.target.files || []))} type="file" /></label>
      {error && <p className="text-sm text-red-600 sm:col-span-2" role="alert">{error}</p>}
      <div className="flex justify-end sm:col-span-2"><button className="rounded-full bg-[#7C3AED] px-7 py-3 font-semibold text-white disabled:opacity-60" disabled={submitting} type="submit">{submitting ? 'Saving…' : 'Create listing'}</button></div>
    </form></section></div></main>
}
