import { useEffect, useState } from 'react'
import api, { resolveAssetUrl } from '../../../../services/api'

export default function ListingsTable() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [editError, setEditError] = useState('')
  useEffect(() => { api.get('/listings/admin/my-listings').then(({ data }) => setRows(Array.isArray(data) ? data : [])).catch((requestError) => setError(requestError.response?.data?.error?.message || 'Unable to load your listings. Sign in as a house admin and try again.')) }, [])
  async function save(event) {
    event.preventDefault()
    setEditError('')
    const images = editing.images || []
    const newImages = editing.newImages || []
    if (images.length + newImages.length < 3) {
      setEditError('You must upload at least 3 images')
      return
    }
    try {
      const uploadedImages = await Promise.all(newImages.map(async (file) => {
        const uploadForm = new FormData()
        uploadForm.append('file', file)
        const { data } = await api.post('/upload', uploadForm)
        return data.url
      }))
      const { data } = await api.patch(`/listings/${editing._id}`, {
        title: editing.title,
        location: editing.location,
        description: editing.description,
        price: Number(editing.price),
        discount: Number(editing.discount || 0),
        discountInterval: Number(editing.discountInterval || 1),
        images: [...images, ...uploadedImages],
      })
      setRows((current) => current.map((item) => item._id === data._id ? data : item))
      setEditing(null)
    } catch (requestError) { setEditError(requestError.response?.data?.message || 'Unable to update listing.') }
  }
  async function remove(listing) {
    if (!window.confirm(`Delete ${listing.title}?`)) return
    try { await api.delete(`/listings/${listing._id}`); setRows((current) => current.filter((item) => item._id !== listing._id)); setEditing(null) }
    catch (requestError) { setError(requestError.response?.data?.message || 'Unable to delete listing.') }
  }
  return <>
    <section aria-label="Your guesthouse listings" className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      {error && <p role="alert" className="p-6 text-red-600">{error}</p>}
      {!error && rows.length === 0 && <p className="p-6 text-[#64748B]">No listings yet.</p>}
      {rows.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left"><thead className="bg-[#F8FAFC] dark:bg-[#0A0E1A]"><tr><th className="px-5 py-4 text-xs text-[#94A3B8] sm:px-8">PROPERTY</th><th className="px-5 py-4 text-xs text-[#94A3B8] sm:px-8">LOCATION</th><th className="px-5 py-4 text-xs text-[#94A3B8]">STATUS</th><th className="px-5 py-4 text-right text-xs text-[#94A3B8] sm:px-8">ACTION</th></tr></thead><tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1E2A45]">{rows.map((listing) => <tr key={listing._id}><td className="px-5 py-5 font-semibold sm:px-8">{listing.title}</td><td className="px-5 py-5 text-sm text-[#64748B] sm:px-8">{listing.location}</td><td className="px-5 py-5"><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold capitalize text-violet-700">{listing.status}</span></td><td className="px-5 py-5 text-right sm:px-8"><button type="button" onClick={() => { setEditError(''); setEditing({ ...listing, images: Array.isArray(listing.images) ? [...listing.images] : [], newImages: [] }) }} className="rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold text-violet-700">Manage</button></td></tr>)}</tbody></table></div>}
    </section>
    {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><form onSubmit={save} className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-3xl bg-white p-6 dark:bg-[#141B2D]"><div className="flex justify-between"><h2 className="text-xl font-bold">Manage listing</h2><button type="button" onClick={() => setEditing(null)} aria-label="Close">Ã—</button></div>{[['title', 'Title'], ['location', 'Location'], ['price', 'Price per night'], ['discount', 'Discount amount'], ['discountInterval', 'Discount interval (days)'], ['description', 'Description']].map(([field, label]) => <label key={field} className="block text-sm font-semibold">{label}<input required={field !== 'description'} min={field === 'price' || field === 'discount' ? 0 : field === 'discountInterval' ? 1 : undefined} type={['price', 'discount', 'discountInterval'].includes(field) ? 'number' : 'text'} value={editing[field] ?? (field === 'discountInterval' ? 1 : field === 'discount' ? 0 : '')} onChange={(event) => setEditing((item) => ({ ...item, [field]: event.target.value }))} className="mt-1 block w-full rounded-xl border px-3 py-2 dark:bg-[#0A0E1A]" /></label>)}<div className="space-y-2"><p className="text-sm font-semibold">Photos (minimum 3)</p><div className="grid grid-cols-3 gap-2">{(editing.images || []).map((image, index) => <div key={`${image}-${index}`} className="space-y-1"><img src={resolveAssetUrl(image)} alt={`Listing photo ${index + 1}`} className="h-20 w-full rounded-xl object-cover" /><button type="button" onClick={() => setEditing((item) => ({ ...item, images: item.images.filter((_, imageIndex) => imageIndex !== index) }))} className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-600">Remove</button></div>)}</div><label className="block text-sm">Upload photos<input className="mt-1 block w-full rounded-xl border px-3 py-2 dark:bg-[#0A0E1A]" accept="image/*" multiple type="file" onChange={(event) => { const files = Array.from(event.target.files || []); setEditing((item) => ({ ...item, newImages: [...(item.newImages || []), ...files] })); event.target.value = '' }} /></label>{(editing.newImages || []).map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center justify-between text-xs text-[#64748B]"><span className="truncate">{file.name}</span><button type="button" onClick={() => setEditing((item) => ({ ...item, newImages: item.newImages.filter((_, fileIndex) => fileIndex !== index) }))} className="ml-2 text-red-600">Remove</button></div>)}</div>{editError && <p role="alert" className="text-sm text-red-600">{editError}</p>}<div className="flex justify-between"><button type="button" onClick={() => remove(editing)} className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600">Delete listing</button><button className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white">Save changes</button></div></form></div>}
  </>
}
